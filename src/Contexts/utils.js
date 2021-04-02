const DEFAULT_TEMPLATE = "SSSDDDDDD";

/**
 * Generate Random SKU with defaultor custom template strings.
 * To add String put an 'S' and to add digits use 'D'.
 * Special characters will not be replaced.
 *
 * `eg` 'SS-DDDD' will give something like 'FE-2435'
 * @param {String} template The Template to use for SKU
 * @returns SKU string in specified(or default) template
 */
const skuGenerator = (template) => {
  console.log({ template, DEFAULT_TEMPLATE });

  return (template || DEFAULT_TEMPLATE).replaceAll(/\w/g, (x) => {
    switch (x) {
      case "S":
        return String.fromCharCode(
          "A".charCodeAt(0) + (parseInt(Math.random() * 100) % 26)
        );

      case "D":
        return parseInt(Math.random() * 10);

      default:
        return x;
    }
  });
};

module.exports = {
  skuGenerator,
};
