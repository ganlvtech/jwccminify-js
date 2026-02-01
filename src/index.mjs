// Syntax from https://www.json.org/json-en.html

/**
 * @param {string} str json or jwcc
 * @returns {string} valid json (replace comments and trailing commas with whitespace to preserve character positions)
 */
export function jwccstrip(str) {
  const result = [];
  let inString = false;
  let inSingleLineComment = false;
  let inMultiLineComment = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const nextChar = str[i + 1]; // may be undefined

    if (inString) {
      result.push(char);
      if (char === '\\') {
        if (nextChar !== undefined) {
          result.push(nextChar);
          i++;
        }
      } else if (char === '"') {
        inString = false;
      }
    } else if (inSingleLineComment) {
      if (char === '\t' || char === '\r' || char === '\n') {
        result.push(char);
        if (char === '\r' || char === '\n') {
          inSingleLineComment = false;
        }
      } else {
        result.push(' ');
      }
    } else if (inMultiLineComment) {
      if (char === '\t' || char === '\r' || char === '\n') {
        result.push(char);
      } else if (char === '*' && nextChar === '/') {
        result.push(' ');
        result.push(' ');
        inMultiLineComment = false;
        i++;
      } else {
        result.push(' ');
      }
    } else if (char === '"') {
      result.push(char);
      inString = true;
    } else if (char === '/' && nextChar === '/') {
      result.push(' ');
      result.push(' ');
      inSingleLineComment = true;
      i++;
    } else if (char === '/' && nextChar === '*') {
      result.push(' ');
      result.push(' ');
      inMultiLineComment = true;
      i++;
    } else if (char === ']' || char === '}') {
      // Remove trailing comma before } or ]
      for (let j = result.length - 1; j >= 0; j--) {
        const currentChar = result[j];
        if (currentChar === ' ' || currentChar === '\t' || currentChar === '\r' || currentChar === '\n') {
          continue;
        } else if (currentChar === ',') {
          result[j] = ' ';
        } else {
          break;
        }
      }
      result.push(char);
    } else {
      result.push(char);
    }
  }
  return result.join('');
}

/**
 * @param {string} str json or jwcc
 * @returns {string} minified json without comments and trailing commas
 */
export function jwccminify(str) {
  const result = [];
  let inString = false;
  let inSingleLineComment = false;
  let inMultiLineComment = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const nextChar = str[i + 1]; // may be undefined

    if (inString) {
      result.push(char);
      if (char === '\\') {
        if (nextChar !== undefined) {
          result.push(nextChar);
          i++;
        }
      } else if (char === '"') {
        inString = false;
      }
    } else if (inSingleLineComment) {
      if (char === '\r' || char === '\n') {
        inSingleLineComment = false;
      }
    } else if (inMultiLineComment) {
      if (char === '*' && nextChar === '/') {
        inMultiLineComment = false;
        i++;
      }
    } else if (char === '"') {
      result.push(char);
      inString = true;
    } else if (char === '/' && nextChar === '/') {
      inSingleLineComment = true;
      i++;
    } else if (char === '/' && nextChar === '*') {
      inMultiLineComment = true;
      i++;
    } else if (char === ']' || char === '}') {
      // Remove trailing comma before } or ]
      for (let j = result.length - 1; j >= 0; j--) {
        const currentChar = result[j];
        if (currentChar === ' ' || currentChar === '\t' || currentChar === '\r' || currentChar === '\n' || currentChar === ',') {
          result.pop();
        } else {
          break;
        }
      }
      result.push(char);
    } else if (char === ' ' || char === '\t' || char === '\r' || char === '\n') {
      // Skip whitespace characters
    } else {
      result.push(char);
    }
  }
  return result.join('');
}

export default jwccminify;
