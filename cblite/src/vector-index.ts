/**
 * vector-index.ts
 * 
 * Vector index support for Couchbase Lite vector search.
 * Enables APPROX_VECTOR_DISTANCE() queries for similarity search.
 * 
 * @see https://docs.couchbase.com/couchbase-lite/current/swift/working-with-vector-search.html
 */

import { IndexType, AbstractIndex } from './abstract-index';

/**
 * Distance metric used for vector similarity calculations.
 */
export enum DistanceMetric {
  /**
   * Euclidean distance (L2 norm).
   * Best for: Dense vectors where magnitude matters.
   */
  EUCLIDEAN = 'euclidean',
  
  /**
   * Squared Euclidean distance (faster, no sqrt).
   * Best for: When you only need relative ordering.
   */
  EUCLIDEAN_SQUARED = 'euclideanSquared',
  
  /**
   * Cosine similarity (normalized dot product).
   * Best for: Text embeddings, normalized vectors.
   */
  COSINE = 'cosine',
  
  /**
   * Dot product similarity.
   * Best for: When vectors are already normalized.
   */
  DOT = 'dot',
}

/**
 * Scalar Quantizer encoding types for vector compression.
 */
export enum ScalarQuantizerType {
  /** No quantization - full precision */
  NONE = 'none',
  /** 4-bit quantization */
  SQ4 = 'SQ4',
  /** 6-bit quantization */
  SQ6 = 'SQ6',
  /** 8-bit quantization (recommended) */
  SQ8 = 'SQ8',
}

/**
 * Vector encoding configuration for index compression.
 */
export class VectorEncoding {
  private _type: string;
  private _bits?: number;
  private _subquantizers?: number;

  private constructor(type: string, bits?: number, subquantizers?: number) {
    this._type = type;
    this._bits = bits;
    this._subquantizers = subquantizers;
  }

  /**
   * No encoding - vectors stored at full precision.
   */
  static none(): VectorEncoding {
    return new VectorEncoding('none');
  }

  /**
   * Scalar Quantizer encoding.
   * Reduces each dimension to fewer bits.
   * 
   * @param type - Quantization level (SQ4, SQ6, SQ8)
   */
  static scalarQuantizer(type: ScalarQuantizerType = ScalarQuantizerType.SQ8): VectorEncoding {
    return new VectorEncoding('SQ', undefined, undefined);
  }

  /**
   * Product Quantizer encoding.
   * Groups dimensions into subvectors and quantizes each.
   * 
   * @param subquantizers - Number of subquantizers (must divide dimensions evenly)
   * @param bits - Bits per subquantizer (4 or 8)
   */
  static productQuantizer(subquantizers: number, bits: number = 8): VectorEncoding {
    return new VectorEncoding('PQ', bits, subquantizers);
  }

  toJson(): any {
    if (this._type === 'none') {
      return { type: 'none' };
    } else if (this._type === 'SQ') {
      return { type: 'SQ' };
    } else {
      return {
        type: 'PQ',
        bits: this._bits,
        subquantizers: this._subquantizers,
      };
    }
  }
}

/**
 * Configuration for creating a vector index on a collection.
 * 
 * Vector indexes enable efficient approximate nearest neighbor (ANN) search
 * using the APPROX_VECTOR_DISTANCE() SQL++ function.
 * 
 * @example
 * ```typescript
 * // Create a vector index for 512-dimensional CLIP embeddings
 * const config = new VectorIndexConfiguration('embedding', 512, 100);
 * config.metric = DistanceMetric.COSINE;
 * await collection.createIndex('embedding_idx', config);
 * ```
 */
export class VectorIndexConfiguration {
  private _expression: string;
  private _dimensions: number;
  private _centroids: number;
  private _metric: DistanceMetric = DistanceMetric.EUCLIDEAN_SQUARED;
  private _encoding: VectorEncoding = VectorEncoding.none();
  private _minTrainingSize: number = 0;
  private _maxTrainingSize: number = 0;
  private _numProbes: number = 0;
  private _isLazy: boolean = false;

  /**
   * Creates a new VectorIndexConfiguration.
   * 
   * @param expression - The document property path containing the vector (e.g., "embedding")
   * @param dimensions - Number of dimensions in the vector (2-4096, must match your embedding model)
   * @param centroids - Number of centroids for clustering (typically sqrt(num_documents))
   */
  constructor(expression: string, dimensions: number, centroids: number) {
    if (dimensions < 2 || dimensions > 4096) {
      throw new Error('Vector dimensions must be between 2 and 4096');
    }
    if (centroids < 1) {
      throw new Error('Centroids must be at least 1');
    }
    this._expression = expression;
    this._dimensions = dimensions;
    this._centroids = centroids;
  }

  /** The expression identifying the vector field */
  get expression(): string {
    return this._expression;
  }

  /** Number of dimensions in the vector */
  get dimensions(): number {
    return this._dimensions;
  }

  /** Number of centroids for the index */
  get centroids(): number {
    return this._centroids;
  }

  /** Distance metric for similarity calculation */
  get metric(): DistanceMetric {
    return this._metric;
  }

  set metric(value: DistanceMetric) {
    this._metric = value;
  }

  /** Vector encoding for compression */
  get encoding(): VectorEncoding {
    return this._encoding;
  }

  set encoding(value: VectorEncoding) {
    this._encoding = value;
  }

  /** Minimum training size (0 = use default) */
  get minTrainingSize(): number {
    return this._minTrainingSize;
  }

  set minTrainingSize(value: number) {
    this._minTrainingSize = value;
  }

  /** Maximum training size (0 = use default) */
  get maxTrainingSize(): number {
    return this._maxTrainingSize;
  }

  set maxTrainingSize(value: number) {
    this._maxTrainingSize = value;
  }

  /** Number of probes during search (0 = use default) */
  get numProbes(): number {
    return this._numProbes;
  }

  set numProbes(value: number) {
    this._numProbes = value;
  }

  /** Whether the index should be built lazily */
  get isLazy(): boolean {
    return this._isLazy;
  }

  set isLazy(value: boolean) {
    this._isLazy = value;
  }

  /**
   * Serializes the configuration to JSON for native bridge.
   */
  toJson(): any {
    return {
      type: 'vector',
      expression: this._expression,
      dimensions: this._dimensions,
      centroids: this._centroids,
      metric: this._metric,
      encoding: this._encoding.toJson(),
      minTrainingSize: this._minTrainingSize,
      maxTrainingSize: this._maxTrainingSize,
      numProbes: this._numProbes,
      isLazy: this._isLazy,
    };
  }
}

/**
 * VectorIndex class for QueryBuilder-style index creation.
 * 
 * @example
 * ```typescript
 * const index = new VectorIndex('embedding', 512, 100);
 * index.setMetric(DistanceMetric.COSINE);
 * await collection.createIndex('my_vector_idx', index);
 * ```
 */
export class VectorIndex extends AbstractIndex {
  private _expression: string;
  private _dimensions: number;
  private _centroids: number;
  private _metric: DistanceMetric = DistanceMetric.EUCLIDEAN_SQUARED;
  private _encoding: VectorEncoding = VectorEncoding.none();
  private _minTrainingSize: number = 0;
  private _maxTrainingSize: number = 0;
  private _numProbes: number = 0;
  private _isLazy: boolean = false;

  constructor(expression: string, dimensions: number, centroids: number) {
    super();
    this._expression = expression;
    this._dimensions = dimensions;
    this._centroids = centroids;
  }

  setMetric(metric: DistanceMetric): VectorIndex {
    this._metric = metric;
    return this;
  }

  setEncoding(encoding: VectorEncoding): VectorIndex {
    this._encoding = encoding;
    return this;
  }

  setMinTrainingSize(size: number): VectorIndex {
    this._minTrainingSize = size;
    return this;
  }

  setMaxTrainingSize(size: number): VectorIndex {
    this._maxTrainingSize = size;
    return this;
  }

  setNumProbes(probes: number): VectorIndex {
    this._numProbes = probes;
    return this;
  }

  setLazy(lazy: boolean): VectorIndex {
    this._isLazy = lazy;
    return this;
  }

  type(): IndexType {
    // Vector = 3 in IndexType enum
    return 3 as IndexType;
  }

  language(): string {
    return '';
  }

  ignoreAccents(): boolean {
    return false;
  }

  items(): any[] {
    return [];
  }

  toJson(): any {
    return {
      type: 'vector',
      expression: this._expression,
      dimensions: this._dimensions,
      centroids: this._centroids,
      metric: this._metric,
      encoding: this._encoding.toJson(),
      minTrainingSize: this._minTrainingSize,
      maxTrainingSize: this._maxTrainingSize,
      numProbes: this._numProbes,
      isLazy: this._isLazy,
    };
  }
}
