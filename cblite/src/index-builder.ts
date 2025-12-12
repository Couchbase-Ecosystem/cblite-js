import { ValueIndexItem, ValueIndex } from './value-index';
import { FullTextIndex, FullTextIndexItem } from './full-text-index';
import { VectorIndex, DistanceMetric } from './vector-index';

export class IndexBuilder {
  /**
   * Create a value index with the given index items. The index items are a list of
   * the properties or expressions to be indexed.
   *
   * @param items The index items
   * @return The value index
   */
  public static valueIndex(...items: ValueIndexItem[]): ValueIndex {
    return new ValueIndex(...items);
  }

  /**
   * Create a full-text search index with the given index item and options. Typically the index item is
   * the property that is used to perform the match operation against with.
   *
   * @param items The index items.
   * @return The full-text search index.
   */
  public static fullTextIndex(...items: FullTextIndexItem[]): FullTextIndex {
    return new FullTextIndex(...items);
  }

  /**
   * Create a vector index for approximate nearest neighbor search.
   *
   * @param expression The property path containing the vector (e.g., "embedding")
   * @param dimensions Number of dimensions in the vector (2-4096)
   * @param centroids Number of centroids for clustering (typically sqrt(num_documents))
   * @return The vector index
   */
  public static vectorIndex(
    expression: string,
    dimensions: number,
    centroids: number
  ): VectorIndex {
    return new VectorIndex(expression, dimensions, centroids);
  }
}
