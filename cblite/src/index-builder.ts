import { ValueIndexItem, ValueIndex } from './value-index';
import { FullTextIndex, FullTextIndexItem } from './full-text-index';

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
}
