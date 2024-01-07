// 使用module身上的exports属性导出方法
module.exports = (temp, product) => {
  // 通过正则表达式替换HTML模版中的内容
  let output = temp
    .replace(/{{PRODUCTNAME}}/g, product.productName)
    .replace(/{{IMAGE}}/g, product.image)
    .replace(/{{PRICE}}/g, product.price)
    .replace(/{{QUANTITY}}/g, product.quantity)
    .replace(/{{ID}}/g, product.id)
    .replace(/{{NUTRIENTS}}/g, product.nutrients)
    .replace(/{{FROM}}/g, product.from)
    .replace(/{{DESCRIPTION}}/g, product.description);
  if (!product.organic)
    output = output.replace(/{{NOT_ORIGANIC}}/g, "not__origanic");
  return output;
};
