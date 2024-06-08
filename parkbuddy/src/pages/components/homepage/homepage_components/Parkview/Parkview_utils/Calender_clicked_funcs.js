
export function Compare_dates (Selcted_date_date){
    
    
    let now_time=new Date().getTime();
    let Selcted_date=Selcted_date_date.getTime()
    let diff=Selcted_date-now_time;
    console.log("Sel time: ",Selcted_date);
    console.log("Now time: ",now_time);
    if(diff>=0){
        console.log("Future event");
    }else{
        console.log("Diff time: ",diff);
        console.log("Past event");
    }

}
