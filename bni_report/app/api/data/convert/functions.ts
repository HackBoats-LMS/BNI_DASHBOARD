export function transformMemeber(row: any){
    const total_mettings = row.P+ row.A + row.L + row.M + row.S ;

    //Attendance Percentage and Points calculation 
    const attendancePercentage = ((row.P+row.L+row.M+row.S)/total_mettings)*100;
    let attendancePoints = 0;
    if(attendancePercentage<88){
        attendancePoints = 0;
    }else if(attendancePercentage>=88 && attendancePercentage<=94){
        attendancePoints = 5;
    }else if (attendancePercentage>=95){
        attendancePoints =10;
    }

    //Referals points calculation
    const referals = (row.RGI+row.RGO)/total_mettings;
    let referalPoints = 0;
    if(referals<0.25){
        referalPoints =0;
    }else if(referals>=0.25 && referals<0.5 ){
        referalPoints = 5;
    }else if (referals>=0.5 && referals<0.75){
        referalPoints =10;
    }else if(referals>=0.75 && referals<1){
        referalPoints =15;
    }else if (referals>=1 && referals < 1.25 ){
        referalPoints = 20;
    }else if(referals>=1.25){
        referalPoints =25;
    }

    //visitiors calculation
    const visitors = Math.round(row.V/6)
    let visitorsPoints = 0;
    if (visitors == 0){
        visitorsPoints = 0;
    }else if (visitors ==1){
        visitorsPoints = 5;
    }else if (visitors ==2){
        visitorsPoints = 10;
    }else if (visitors ==3){
        visitorsPoints = 15;
    }else if (visitors ==4){
        visitorsPoints = 20;
    }else if (visitors >=5){
        visitorsPoints = 25;
    }

    //TYFCB Points calculation
    const TYFCB = row.TYFCB/41599;
    let TYFCBPoints = 0;
    if(TYFCB == 0){
        TYFCBPoints = 0;
    }else if (TYFCB >0 && TYFCB<2){
        TYFCBPoints = 1;
    }else if (TYFCB >=2 && TYFCB<5){
        TYFCBPoints = 2;
    }else if (TYFCB >=5 && TYFCB<15){
        TYFCBPoints = 3;
    }else if (TYFCB >=15 && TYFCB<30){
        TYFCBPoints = 4;
    }else if (TYFCB >=30 ){
        TYFCBPoints = 5;
    }
    
    //1-2-2 POINTS CALCULATION
    const onetoone = row["1-2-1"]/total_mettings;
    let onetoonePoints = 0;
    if(onetoone < 0.25){
        onetoonePoints = 0;
    }else if (onetoone >=0.25 && onetoone<0.5){
        onetoonePoints = 5;
    }else if (onetoone >=0.5 && onetoone<0.75){
        onetoonePoints = 10;
    }else if (onetoone >=0.75 && onetoone<1){
        onetoonePoints = 15;
    }else if (onetoone >=1){
        onetoonePoints = 20;
    }


    //CEU POINTS CALCULATION
    const CEU = row.CEU/total_mettings;
    let CEUPoints = 0;
    if(CEU == 0){
        CEUPoints = 0;
    }else if (CEU >0 && CEU<=0.5){
        CEUPoints = 5;
    }else if (CEU >0.5){
        CEUPoints = 10;
    }

    //Sponcered members by you
    const total_members = row.Sponsor ;
    let sponsorPoints = 0;
    if(sponsorPoints == 0){
        sponsorPoints = 0;
    }else if(sponsorPoints >=1){
        sponsorPoints = 5;
    }

    //total score band
    const totalScore = attendancePoints+referalPoints+visitorsPoints+TYFCBPoints+onetoonePoints+CEUPoints+sponsorPoints;
    
    let band = '';
    
    if (totalScore>=70 && totalScore<=100){
        band = 'GREEN';
    }else if (totalScore>=50 && totalScore<=69){
        band = 'AMBER';
    }else if (totalScore>=30 && totalScore<=49){
        band = 'RED';
    }else if (totalScore<=29){
        band = 'GREY';
    }else{
        band = 'GREY';
    }
    
    return {

        fullName: `${row["First Name"]} ${row["Last Name"]}`,
        attendancePercentage,
        attendancePoints,
        referals,
        referalPoints,
        visitors,
        visitorsPoints,
        TYFCB,
        TYFCBPoints,
        onetoone,
        onetoonePoints,
        CEU,
        CEUPoints,
        sponsorPoints,
        totalScore,
        band,
        
    }
}