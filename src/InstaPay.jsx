import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';

export default function InstaPay() {
    const amountInput = useRef();
    const[userInfo,SetUserInfo] = useState({
        name:'Hend Soliman',
    });
    const [balance,SetBalanc] = useState(0);
    const[transaction,SetTransaction]=useState([]);

    const[showBalance, SetShowBalance] = useState(false);
    const [Showtransaction,SetShowTransaction] = useState(false)
    const toggelBalance = ()=>{
        showBalance ? SetShowBalance (false) :  SetShowBalance(true);
    }

    const DepositAmount = ()=>{
         let amount = +amountInput.current.value ;
         let newBalance = balance + amount ;
   
        let time = moment().format('YYYY-MM-DD / hh:mm:ss A')
        let newTransaction = {  
        BeforBalance: balance, 
        amount: amount, 
        type: "deposit",  
        AfterBalance: newBalance, 
        date:time, 
      };
      let copy = [...transaction , newTransaction];
       localStorage.setItem('balance',newBalance);
       localStorage.setItem('transaction',JSON.stringify(copy));
      SetTransaction(copy);
         SetBalanc(newBalance);
         amountInput.current.value = "";

    };
    const WithdrawAmount = ()=>{
          let amount = +amountInput.current.value ;
          if(amount <= balance ){
        let newBalance = balance - amount ;
        let time = moment().format('YYY-MM-DD / hh:mm:ss A')
        let newTransaction = {  
        BeforBalance: balance, 
        amount: amount, 
        type: "withdraw",  
        AfterBalance: newBalance, 
        date:time, 
      };
      let copy = [...transaction , newTransaction];
       localStorage.setItem('balance',newBalance);
       localStorage.setItem('transaction',JSON.stringify(copy));
      SetTransaction(copy);
        SetBalanc(newBalance);
       
             amountInput.current.value = "";
          }else{
            alert('Not Impossible');
          }
          }

        useEffect(()=>{
            let balanceFromLocalstorage = localStorage.getItem('balance') || 0;
            let transactionsFromLocalstorage = JSON.parse(localStorage.getItem('transaction')) || [] ;
            SetBalanc(balanceFromLocalstorage);
            SetTransaction(transactionsFromLocalstorage);

        },[])

  return (
    <div className='w-full h-dvh overflow-auto text-amber-50'>
        <div className='container p-4 gap-3 flex flex-col'>
        <h1>welcom : {userInfo.name}</h1>
        <p>Balance :{showBalance ? balance : '*****'}</p>
        <div className='flex flex-wrap gap-3 items-center'>
            <button onClick={()=>SetShowTransaction(true)} className='btn btn-dark'>show transaction</button>
        <button className={ showBalance ? 'btn btn-warning' : 'btn btn-primary' } onClick={toggelBalance}>{showBalance ? 'hide Balance' :'show Balance'}</button>
        {
            showBalance && (
                  <div className='w-full flex gap-3'>
        <input ref={amountInput} className='input' placeholder='Enter Amount'></input>
        <button className='btn btn-success' onClick={DepositAmount}>Deposit</button>
        <button className='btn btn-error' onClick={WithdrawAmount}>Withdrow</button>
        </div>
        )}
        {Showtransaction && (
            transaction.length == 0 ?(<div className='w-full text-center text-red-500'>There are no transaction</div> )  :(
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Befor Balance</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>After Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map ((el,index) =>{
                        return (
                           <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{el.BeforBalance}</td>
                            <td>{el.amount}</td>
                            <td className={el.type == 'withdraw' ? 'btn btn-error' : 'btn btn-success'}>{el.type}</td>
                            <td>{el.AfterBalance}</td>
                            <td>{el.date}</td>
                        </tr>
                        );
                    })}
                </tbody>
                        
                       
            </table>
            )

            
   
        
      
        )}
        
      
        </div>
        </div>

    </div>
  )
}
