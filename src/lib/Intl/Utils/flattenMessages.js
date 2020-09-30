/**
 * Create a flat version of the given messages
 *
 * @param  {Object} nestedMessages Messages object
 * @param  {String} [prefix='']    Prefix[description]
 *
 * @return {Object} messages Flat messages
 */
export default function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}
