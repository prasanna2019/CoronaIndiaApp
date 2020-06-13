/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import {Picker} from '@react-native-community/picker';
 class App extends Component {
   constructor(props){
    super(props);
    states=[],
     this.state={
       data:'',
       isLoading:true,
       error:null,
       location:null
       
     }
   }
   componentDidMount(){
      fetch('https://api.rootnet.in/covid19-in/stats/latest').then(response=>response.json())
      .then((data)=>{
       console.log(data.data.summary)
          if(data.success==true){ 
            console.log(data.data.summary)
            data.data.regional.map(state=> {
              states.push(state.loc)
            })
            
          this.setState({data:data.data,isLoading:false})
        }
        else{
          this.setState({error:'Please try again later', isLoading:false})
        }
      })
      .catch((error) => {
        this.setState({error:'Please try again later...', isLoading:false})
      });
   }

 
   render(){

     if(this.state.isLoading==true){
       return(
        <View style={{backgroundColor:'orange', flex:1, justifyContent:"center", alignContent:"center"}}>
          <Text style={{ textAlign:"center", fontSize:25, color: 'white'}}>Stay Home, Stay Safe</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
       )
     }
     
     else{
      if(this.state.error!= null){
        return (
          <View style={{backgroundColor:'orange', flex:1, justifyContent:"center", alignContent:"center"}}>
            <Text  style={{ textAlign:"center", fontSize:25, color: 'white'}}>
              {this.state.error}
            </Text>
          </View>
        )
      }
      else{
          return (
		  <View style={{flex: 1}}>
            <ScrollView >
            <DisplayData data={this.state.data.summary} heading={'Corona cases in India'} />
              <View style={styles.stateView}>
                  
                <Picker
                  selectedValue={this.state.location}
                  style={{ width: '70%',fontSize:27 }}
                  onValueChange={(itemValue) =>
                    this.setState({location:itemValue})
                  }>
                  <Picker.Item label="Select a State" value={0} color="black" key={9}/>
                  {states.map((item, index) => {
                        return (<Picker.Item label={item} value={item} color="black" key={index}/>) 
                    })}
                    
                </Picker>

             { this.state.location != null ?   this.state.data.regional.map(location =>{
                if(location.loc == this.state.location){
                    return <DisplayData data={location} heading={location.loc} />
           
                }
       
               }): null }
              </View>
			
           </ScrollView>
		     <View><Text>* https://flaticon.com for icons</Text></View>
		 </View>
          )
        }
      }
    }
    
 }

 DisplayData=({data, heading})=>{
    return  (
        <View style={styles.main}>
            <Text style={styles.heading}>{heading}</Text>
            <Text style={{fontSize:25, color:'grey'}} key={'14'}>Confirmed Cases : {data.totalConfirmed || data.confirmedCasesIndian} </Text>
            <Text style={{fontSize:25, color:'green'}} key={'15'}>Discharged : {data.discharged} </Text>
            <Text style={{fontSize:25, color: 'red'}} key={'16'}>Deaths : {data.deaths} </Text>
        </View>
    )
}

 const styles= StyleSheet.create({
  heading:{
    fontSize:31, marginBottom:'4%'  
  },
  main:
  {flex:1, borderWidth:1, margin:'4%', marginTop:'10%', padding:'1%',width:'90%',backgroundColor:'moccasin'},
  stateView:
  {flex:1, marginTop:'10%', padding:'1%',width:'100%'},
  stateInfo:
  { padding:'1%',width:'90%', backgroundColor:'moccasin',borderWidth:1}
 })


export default App;
