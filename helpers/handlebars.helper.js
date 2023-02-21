module.exports = {
    pagination : function(options) {
        let output = '';
        if(options.hash.current === 1){
            output += `<li><a class="disabled"><i class='fa fa-angle-left'></i></a></li>`
        }else{
            output += `<li><a  class="disabled" href="?page=1"><i class='fa fa-angle-left'></i></a></li>`
        }

        let i = (Number(options.hash.current)>5 ? Number(options.hash.current) - 4 : 1);

        if(i!==1) {
            output += `<li class="disabled"><a>...</a></li>`;
        }

        for(; i<= (Number(options.hash.current) + 4) && i<= options.hash.pages; i++){
            if(i=== options.hash.current){
                output += `<li><a class="active">${i}</a></li>`;
            }else{
                output += `<li><a class="disabled" href="?page=${i}">${i}</a></li>`;
            }
        } 

        if(options.hash.current === options.hash.pages){
            output += `<li><a class="disabled"><i class='fa fa-angle-right'></i></a></li>`;
        }else{
            output += `<li><a class="disabled" href="?page=${options.hash.pages}"><i class='fa fa-angle-right'></i></a></li>`;
        }
        return output;
    }
}