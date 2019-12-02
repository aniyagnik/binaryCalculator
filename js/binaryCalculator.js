let response=document.getElementById("res");
let btn0=document.getElementById("btn0");
let btn1=document.getElementById("btn1");

document.getElementById("btnClr").addEventListener('click',()=>{
    response.innerHTML="";  
})

btn0.addEventListener('click',()=>{
    response.innerHTML+=0;  
})

btn1.addEventListener('click',()=>{
    response.innerHTML+=1;  
})

document.getElementById("btnSum").addEventListener('click',()=>{
    response.innerHTML+="+";  
})

document.getElementById("btnSub").addEventListener('click',()=>{
    response.innerHTML+="-";  
})

document.getElementById("btnMul").addEventListener('click',()=>{
    response.innerHTML+="*";  
})

document.getElementById("btnDiv").addEventListener('click',()=>{
    response.innerHTML+="/";  
})


document.getElementById("btnEql").addEventListener('click',()=>{
    const expression=response.innerHTML;
    let signI=1;
    for(let i=0;i<expression.length;i++){
        if(expression[i]!=='0' && expression[i]!=='1'){
            signI=i;
            break;
        }   
    }  
    let val1=expression.slice(0,signI);
    let val2=expression.slice(signI+1,expression.length);
    let ans="";
    switch(expression[signI]){
        case "+":{
            ans=addBinary(val1,val2);
            break;
        }
        case "-":{
            let temp="";
            for(let i =0;i<val2.length;i++){
                if(val2[i]=="0"){
                    temp=temp+"1";
                }    
                else
                  {  temp=temp+"0";    }
            }
            val2=addBinary(temp,"1");
            ans=addBinary(val1,val2);
            break;
        }
        case "*":{
            let j=0;
            var temp=[val2.length];
            for(let i=val2.length-1;i>=0;i--,j++){
                if(val2[i]=="1"){
                    console.log('in if for multiplication');
                    temp[j]=val1.padEnd(val1.length+j,"0");
                }
                else{
                    console.log('in else for multiplication');
                    temp[j]="0".padEnd(val1.length+j,"0");
                }
                
            }
            ans=temp[0];
            for(let i=1;i<val2.length;i++){
                ans=addBinary(temp2,temp[i]);
            }
            break;
        }
        case "/":{
            val1=parseInt(val1);
            val2=parseInt(val2);
            ans=parseInt(val1/val2);
            break;
        }
        default:{
            alert("no match case");
            break;
        }
    }
    response.innerHTML=ans;
})

function addBinary(val1,val2){
    if(val1.length>val2.length)
        counter=val1.length;
    else
        counter=val2.length;

    val1=val1.padStart(counter, "0");
    val2=val2.padStart(counter, "0");
    
    let carry="0",ans="";
    let p=counter;

    for(let i=0;i<counter;i++){
        var digit1=parseInt(val1%10);
        var digit2=parseInt(val2%10);
        
        val1=parseInt(val1/10);
        val2=parseInt(val2/10);
        p--;
        val1=val1.toString().padStart(p, "0");;
        val2=val2.toString().padStart(p, "0");;
        let val="0";
        //0 + 0
        if(digit1==0 && digit2==0 && carry==0){
            carry=0;
            val="0";
        }    
        else if(digit1==0 && digit2==0 && carry==1){
                carry=0;
                val="1";
        }
        //0+1
        if(digit1==0 && digit2==1 && carry==0){
            carry=0;
            val=1;
        }    
        else if(digit1==0 && digit2==1 && carry==1){
                carry=1;
                val="0";
            }
        
        //1+0
        if(digit1==1 && digit2==0 && carry==0){
            carry=0;
            val="1";
        }    
        else if(digit1==1 && digit2==0 && carry==1){
                carry=1;
                val="0";
            }
    
        //1+1
        if(digit1==1 && digit2==1 && carry==0){
            carry=1;
            val="0";
        }
        else if(digit1==1 && digit2==1 && carry==1){
                carry=1;
                val="1";
            }
        ans=val+ans;
    }
    if(carry==1)
        ans=carry+ans;
    return ans;
}