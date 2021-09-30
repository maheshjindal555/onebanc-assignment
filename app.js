

const api_url = 
      "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";
  

async function getapi(url) {
    
    const response = await fetch(url);    
    var data = await response.json();


    

    function letmeknowstatus( number){
        switch(number) {
            case 1:
              return "Pending";
              break;
            case 2:
                return "Confirmed";
              break;
            case 3:
                return "Expired";
                break;
            case 4:
                return "Reject";
              break;
            case 5:
                return "Cancel";
              break;
            default:
              // code block
          }
    }


function letmeknowtid(status, tid, type, direc){
    
    if(type === 2 && direc === 1)
        return `<a href="#" style="color: #000; padding: 5px 25px; text-decoration: none; border-radius: 5px; border: 2px solid #000;">Cancel</a>`;

    if(type === 2 && direc === 2 && status === 2)
    return  `<div style="width: 50%; float: left; padding-left: 20px;"><h4>TRANSACTION ID<br>${tid}</h4></div>`;

    if(type === 1 && direc === 1 && status === 2)
    return  `<div style="width: 50%; float: left; padding-left: 20px;"><h4>TRANSACTION ID<br>${tid}</h4></div>`;

    if(type != direc && status === 2)
    return  `<div style="width: 50%; float: left; padding-left: 20px;"><h4>TRANSACTION ID<br>${tid}</h4></div>`;

    if(status == 1 )
        return `<a href="#" style="color: #000; padding: 5px 25px; text-decoration: none; border-radius: 5px; border: 2px solid #000;">Pay</a><a href="#" style="color: #000; padding: 5px 25px; text-decoration: none; border-radius: 5px; border: 2px solid #000;">Decline</a>`; 

    return "";

}

function letmeknowdirection(direction){
    if(direction == 1 ){
        return "right";
    }
    return "left; margin-left: 5%";
}

function letmeknowdatedirection(direction){
    if(direction == 1 ){
        return "right ";
    }
    return "left; margin-left: 44%";
}

function letmeknowmonth(a){
    switch (a){
        case "01": return "January";case "02": return "February"; case "03": return "March";case "04": return "April";case "05": return "May";case "06": return "June";case "07": return "July";case "08": return "August";case "09": return "September";case "10": return "October";case "11": return "November"; case "12": return "December";
    }
}

function letmeknowdate(date, x)
    {
        var ans= "";
        var arr = date.split("-");
        var arr1 = arr[2].split("T");

        ans = arr1[0] + " " + letmeknowmonth(arr[1]) +" " + arr[0];

        if(x){
            ans += ", " + arr1[1];
        }
        return ans;
    }

    function letMeKnowDottedDate(a, b){

        var s = b;

        var arr = a.split("T");
        var arr1 = s.split("T");

        if( arr[0] == arr1[0] ){
            return "";
        }

        return `<div style="padding-top: 20px; width: 100%; margin-top: 20px;">
        <div style="width: 40%;">
            <div style="border-bottom: 2px dotted #000;"></div>
        </div>
        <div style="width: 20%; margin-left: 44%;">
            <div style="margin-top: -11px;">${letmeknowdate(b, 0)}</div>
        </div>
        <div style="width: 40%; float: right; ">
            <div style="border-bottom: 2px dotted #000; margin-top: -9px;"></div>
        </div>
    </div>`;

    }

    var temp ="";
    

    data.transactions.forEach( t => {
    
        document.getElementById("outer-box").insertAdjacentHTML('beforeend',
        
        
               ` ${letMeKnowDottedDate(temp, t.startDate)}
                
                <div style="padding-top: 30px; margin-right: 30px;">
                    
                    <div style="border: 2px solid #000; width: 60%; float: ${letmeknowdirection(t.direction)}; min-height : 200px;">
                        <div>
                            <div style="width: 50%; float: left; padding-left: 20px; ">
                                <h1 style="font-size: 50px; margin-bottom: 0px; margin-top: 20px;">₹  ${t.amount}</h1>
                            </div>
                            <div style="width: 45%; float: right;">
                                <h3 style="float: right;  padding-right: 20px; padding-top: 25px;"><img style="width: 15px;" src="check.png">  ${letmeknowstatus(t.status)}</h3>
                            </div>
                        </div>
                        <div>
                            <div style="width: 50%; float: left; padding-left: 20px;">
                                <h4>${letmeknowtid(t.status, t.id, t.type, t.direction)}</h4>
                            </div>
                            <div style="width: 45%; float: right;">
                                <img style="width: 20px; float: right; padding-right: 20px; padding-top: 30px;" src="right-arrow.png">
                            </div>
                        </div>
                       
                        
                    </div>
                    <br><br><br><br><br><br><br><br><br><br><br><br>
                    <div style="margin-right: 30px; text-align: right; float: ${letmeknowdatedirection(t.direction)};"><h4 >${letmeknowdate(t.startDate, 1)}</h4></div>
                    <br>
                    <br>
                </div>`
        
        );

    temp = t.startDate;

        
    });
    // console.log(data.userId) style="float:";

}

getapi(api_url);
