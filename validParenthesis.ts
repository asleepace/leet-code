/**
 * Valid Parenthesis
 *
 * https://leetcode.com/problems/valid-parentheses/submissions/1602094461/
 */

// Map of opening tags to closing tags.
const TAGS: Record<string, string> = {
    '{': '}',
    '[': ']',
    '(': ')',
}

/**
 * This function will return and empty string if all open tags have matching closing tags,
 * otherwise if there is an imbalance or mismatched tags it will return a string.
 */
const findParenthesis = (str: string, i: number = 0, r: number = 0): string => {
    // handle base case where we reach the end
    if (i === str.length) return r ? String(r) : ''

    // extract current char and check if it's an opening tag
    const tag = str.charAt(i);
    const isOpen = tag in TAGS;

    // iterate all the way to the end first counting the ratio of opening / closing
    const end = findParenthesis(str, i+1, isOpen ? r+1 : r-1);

    // always return when current tag is a closing tag
    if (!isOpen) return tag + end;

    // if there is a mismatch just return the rest
    if (TAGS[tag] !== end.charAt(0)) {
        return end
    }

    // remove the closing tags stack
    return end.slice(1)
}

const isValid = (s: string): boolean => {
    if (s.length % 2 === 1) return false;
    const result = findParenthesis(s)
    console.log(result)
    return findParenthesis(s).length === 0;
}

console.clear()
console.log(isValid('(('))
