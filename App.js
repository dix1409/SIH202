import { StatusBar } from 'expo-status-bar';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TextInput, SafeAreaView,Dimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
const {height, width} =Dimensions.get("window")
import {uid} from "uid"
import { store } from './Firebase/firebase';
export default function App() {
  const[Name,setName]=useState('')
  const[Price,setPrice]=useState('')
  const[Size,setSize]=useState('')
  // const[Quantity,setQuantity]=useState('')
  const[Load,setLoad]=useState(false)
  const[Category,setCategory]=useState('')
  const [add,setadd]=useState(true)
  const [Done,setDone]=useState(false)
  const[Id,setId]=useState('')
  const[image,setImage]=useState('')
  useEffect(()=>{
    if(add){
      setId(uid(15))
    }
  },[add])
  const Add=()=>{
    setadd(false)
    setLoad(true)
    if(Name && Price && Size && Category ){
    
    const productRef=doc(store,`products/${Id}`)
    setDoc(productRef,{
      Name:Name,
      Price:Price,
      Size:Size,
      Category:Category,
      image:image
    }).then(()=>{
      setLoad(false)
      setadd(false)
      setDone(true)
    })
  }
  else {
    alert("Please Fill all details")
  }
  }
  return (

    <View style={styles.container}>
    {Load&&(
      <View style={{flex:1,justifyContent: 'center',alignItems:"center"}}>
        <ActivityIndicator color="red" size="large" />
      </View>
    )}
  
    {add&&(
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <ScrollView >
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign: 'center',marginTop: height*0.1,fontSize:28,fontWeight: 'bold'}}>Add Product Details</Text>
      <View style={{margin:20}}>
       <View  style={{marginVertical:10}}>

        <Text style={{fontSize:16}}>Product Name</Text>
        <TextInput onChangeText={(txt)=>setName(txt)} placeholder="Product Name" style={{height:45,borderWidth:1,borderColor:"black",marginTop:15,borderRadius:10,paddingLeft:5}}/>
       </View>
       <View style={{marginVertical:10}}>

        <Text>Price</Text>
        <TextInput onChangeText={(txt)=>setPrice(txt)} placeholder="Price in Rupees" style={{height:45,borderWidth:1,borderColor:"black",marginTop:15,borderRadius:10,paddingLeft:5}} keyboardType="number-pad" />
       </View>
        <View style={{marginVertical:10}}>
        <Text>Quantity</Text>
        <TextInput onChangeText={(txt)=>setSize(txt)} placeholder="Quantity in gram " style={{height:45,borderWidth:1,borderColor:"black",marginTop:15,borderRadius:10,paddingLeft:5}} keyboardType="number-pad" />

        </View>
         <View style={{marginVertical:10}}>
         <Text>Category</Text>
        <TextInput onChangeText={(txt)=>setCategory(txt)} placeholder="Category" style={{height:45,borderWidth:1,borderColor:"black",marginTop:15,borderRadius:10,paddingLeft:5}} />
         </View>
         <View style={{marginVertical:10}}>
         <Text>Image Link</Text>
        <TextInput onChangeText={(txt)=>setImage(txt)} placeholder="Image Link" style={{height:45,borderWidth:1,borderColor:"black",marginTop:15,borderRadius:10,paddingLeft:5}} />
         </View>
      </View>
       <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

        <TouchableOpacity style={{height:45,width:width*0.45,backgroundColor:"#caf0f8",alignItems:"center",justifyContent: 'center',borderRadius:5}} onPress={Add}>
            <Text>Add Product</Text>
        </TouchableOpacity>
       </View>
     
      <StatusBar style="auto" />
    </SafeAreaView>
    </ScrollView>
    </TouchableWithoutFeedback>)
    }
    {Done&&

    <View style={{flex:1}}>
    
    <View style={{flex: 1,alignItems:"center",justifyContent:"center"}}>
      <Text style={{marginBottom:15,fontSize:26,color:"red"}} >SuccessFully Stored!!</Text>
      <QRCode value={Id}   />
      <TouchableOpacity style={{height:45,width:width*0.45,backgroundColor:"#caf0f8",alignItems:"center",justifyContent: 'center',borderRadius:5,marginTop:20}} onPress={()=>{setDone(false);setadd(true)}}>
        <Text>Back</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />

    </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
});
