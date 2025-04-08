/**
 *  Longest Common Prefix
 *  https://leetcode.com/problems/longest-common-prefix/
 *
 *  a function to find the longest common prefix string amongst an array of strings.
 */
const longestCommonPrefix = (s: string[]): string => {
    if (!s?.length) return "";
    if (!s[0].length) return s[0];
    let i = -1;
    while (
        s[0][++i] &&
        s.every(w=>w.charAt(i)===s[0][i])
    );
    return s[0].slice(0, i);
};
