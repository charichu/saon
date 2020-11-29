import sortArray from "sort-array";

export async function sortCoreAttributes(optoimport: any){  

    if(optoimport.length == 0){

        return   [
                { id: 'ATTR_1', value: 8 },
                { id: 'ATTR_2', value: 8 },
                { id: 'ATTR_3', value: 8 },
                { id: 'ATTR_4', value: 8 },
                { id: 'ATTR_5', value: 8 },
                { id: 'ATTR_6', value: 8 },
                { id: 'ATTR_7', value: 8 },
                { id: 'ATTR_8', value: 8 }
              ];
        
    }

    // @ts-ignore
    sortArray(optoimport, {  
        // @ts-ignore      
        by: 'id', 
        order: 'asc'
    })
      
    for(let n = optoimport.length; n < 8; n++){
        for(let i = 0; i < optoimport.length;i++){
            let id = parseInt(optoimport[i].id.slice(-1)) - 1;
            
            if(i < id){
                const filler = 'ATTR_' + (i+1).toString();  
                optoimport.splice(i, 0, { id: filler, value: 8})
            }else if(i > id){             
                const filler = 'ATTR_' + i.toString();   
                optoimport.splice(i, 0, { id: filler, value: 8})
            }
        }
    }

    return optoimport;
};