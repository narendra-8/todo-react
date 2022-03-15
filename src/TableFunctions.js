import { users } from "./Users";
import _ from 'lodash';

//Function to get the column headers
function columnHeaders(){
    return Object.keys(_.countBy(users,'name'));
}

//function to get the row headers
function rowHeaders(){
    return Object.keys(_.countBy(users,'job'));
}

//Function to get the target totals as per job
function jobTotals(value){
   const filterArray=users.filter((data)=>data.job===value);
   const totalTarget=filterArray.reduce((prv,curr)=>prv+curr.target,0);
   return totalTarget;
}

function nameTotals(value){
    const filterArray=users.filter((data)=>data.name===value);
    const totalTarget=filterArray.reduce((prv,curr)=>prv+curr.target,0);
    return totalTarget;
 }
 //Function to get the target totals as per job
function lastRowData(){
   const valuesArray=columnHeaders().map((value)=>nameTotals(value));
   return valuesArray;
}
//Generate Cell Values
function genCellValues(name,job){
    const filterByNameandJob=users.filter((user)=>user.name===name && user.job===job);
    let targetSum;
    if(filterByNameandJob.length>1){
        targetSum=filterByNameandJob.reduce((prv,curr)=>prv+curr.target,0);
    }
    else if(filterByNameandJob.length===1){
        targetSum=filterByNameandJob[0].target;
    }
    else{
        targetSum=0;
    }
    return targetSum;
}

export {columnHeaders,rowHeaders,jobTotals,lastRowData,genCellValues}