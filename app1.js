const api_url = 
      "https://dev.onebanc.ai/assignment.asmx/GetTransactionSummary?userId=1&transactionId=1";
  

async function getapi(url) {
    
    const response = await fetch(url);    
    var data = await response.json();

    var t = data.transaction;

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
    
    function letmeknowname(name){
        var arr = name.split("@");
        return arr[0];
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

        document.getElementById("outer-box").insertAdjacentHTML('beforeend',
        `<div style="padding-top: 50px;">
        <center>
            <img src="user.png">
            <h3>To ${letmeknowname(t.customer.vPay)}</h3>
            <p>For <b>${t.description} </b></p>
            <h1>₹ ${t.amount}</h1>
            <p><img style="width: 15px;" src="check.png"> ${letmeknowstatus(t.status)}<i style="font-size: 5px;" class="fa fa-circle"></i> ${letmeknowdate(t.endDate, 1)}</p>
        </center>
    </div>
    <div style="padding: 20px; padding-bottom: 50px;">
    <div style="border: 2px solid #000; padding-bottom: 20px;">
        <div style="padding-left: 20px;">
            <img style="width: 50px; padding-top: 15px; padding-bottom: 10px;" src="user.png">
            <h3 style="display: inline-block; padding-top: 10px; padding-left: 10px;">IFSC CODE = ${t.partner.account.ifscCode}<br>${t.partner.account.accountNumber}</h3>
        </div>
        <div style="border-top: 2px solid #000;">
            <div style="padding-left: 20px;">
                <h3>Transaction ID</h3>
                <p>${t.id}</p>
                
                <h3>To ${letmeknowname(t.customer.vPay)}</h3>
                <p> vPay : ${t.customer.vPay}</p>
                
                <h3>From : ${letmeknowname(t.partner.vPay)}</h3>
                <p> vPay :${t.partner.vPay}</p>
            </div>
        </div>
    </div>
    </div>`

        );
        
    

}



getapi(api_url);

