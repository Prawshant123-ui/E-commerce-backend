const slugify=require("slugify")

const generateSlug=(text)=>{
    return slugify(text,{
        lower:true,
        strict:true,
        trim:true,
        replacement:"-",
        locale:"en",
        remove:undefined,
    })
}
module.exports = generateSlug;