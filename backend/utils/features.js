class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,  //regex is regular expression 
            $options: "i", // for case sensitivity i for any ie not case sensetive
          },
        }
      : {};
    //   console.log("first this runs ie keyword");
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr }; 
    //remove fields of catagorey filter
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((key) => delete queryCopy[key]);
    //Price filter
    let queryStr = JSON.stringify(queryCopy);
    
    //replace the key in the object recived by the above queryStr  
    // \b(lt|lte|gt|gte)\b: This is a regular expression that looks for whole words ("lt," "lte," "gt," or "gte"). The \b ensures that it matches the entire word, not part of another word.
    //By adding $ to these terms, the resulting string becomes a valid MongoDB query syntax.
    
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (key) => `$${key}`); 
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(productsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //Page on which we are ifnot then first page

    //skip page is basically when we are in first page show the (productsPerPage = 5(5 products per ) pages in one page
    //when we are inn second page then skip the first  5 product and start from the 6th product
    const skipProduct = productsPerPage * (currentPage - 1); //so  this is skiip page
    this.query = this.query.limit(productsPerPage).skip(skipProduct);
    return this;
  }
}

module.exports = ApiFeatures;
