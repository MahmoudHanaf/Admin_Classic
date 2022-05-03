

import * as React from 'react'
import {
    Text, StyleSheet, View, ScrollView, Switch, TextInput, Dimensions,ActivityIndicator,
    StatusBar, Image, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { backgroundColor, border_color2, text, border_color } from '../Tasks/Colors';
import axios  from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Change_Work_Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            work_time:'',
            Drawer_Visible:false,
            loading:true,
        }
    }


    componentDidMount(){
    this.getData()
    }

    getData(){
        axios.get("https://camp-coding.com/classic/Select_Work_Time.php").then(res=>{
            if(res.status ==200){ 
                // alert(res.data)
                  this.setState({
                    work_time :res.data.trim(),
                    loading:false,
                  })
               
            }else{
              alert("Try agaib later")
            }
         })
    }

     Update_Data(){
        let data_to_send={
            work_time: this.state.work_time.trim()
          }
          axios.post("https://camp-coding.com/classic/Update_Work_Time.php",data_to_send).then(res=>{
            if(res.status ==200){
                // alert(res.data)
                  this.setState({
                    work_time :res.data.trim(),
                  })
                  alert("لقد تم التعديل")
            }else{
              alert("Try agaib later")
            }
         })
     }




render(){
    return(
        <>

{
   this.state.loading ==true ? (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={55} color="#FF5D00">
        </ActivityIndicator>
        </View>
   ):(
     
    <>
        {
        this.state.Drawer_Visible !=true?
        <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          this.state.Drawer_Visible ==false ?(
            this.setState({Drawer_Visible:true})
          ):(
            this.setState({Drawer_Visible:false})
          )
       
         
        }}
      >
        <Icon name="align-justify" size={26} style={{color:'#000'}} />
      </TouchableOpacity>

      <Text style={{ fontSize: 23, fontWeight: 'bold',color:'#000' }}>مواعيد العمل</Text>
      <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Icon name="arrow-left" size={25} style={{ color: '#000' }} />
            </TouchableOpacity>
     
    </View>
    :
    null
    }

      

        {
       this.state.Drawer_Visible ==true ?
       (
        <View style={{height:windowHeight,backgroundColor:'#fff'}}>
        <View style={{
            width:windowWidth*.77,
            height:windowHeight*.97,
            backgroundColor:'#fff',
            shadowColor: "#000",
            position:'relative',
            borderBottomEndRadius:15,
             borderTopRightRadius:15,
            marginTop:7,
           shadowOffset: {
             width: 0,
             height: 1,
           },
           shadowOpacity: 0.22,
           shadowRadius: 2.22,
           elevation: 3,
           alignItems:'center'
            }}>
 
 <View style={[styles.header,{borderTopRightRadius:15,width:windowWidth*.77}]}>
       <TouchableOpacity
         onPress={() => {
           this.state.Drawer_Visible ==false ?(
             this.setState({Drawer_Visible:true})
           ):(
             this.setState({Drawer_Visible:false})
           )
         
          
         }}
       >
         <Icon name="align-justify" size={26} style={{color:'#000'}} />
       </TouchableOpacity>      
     </View>
             <Image source={require('../img/mm1.jpg')}
                style={{width:120,height:120,borderRadius:60,resizeMode:'cover'}}
             />
            
            <TouchableOpacity
              onPress={()=>{
                this.props.navigation.navigate("Select_Day_Orders")
                this.setState({Drawer_Visible:false})
              }}
            >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:23,fontWeight:'bold',color:'#000'}}>طلبات اليوم</Text>
 
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
               </View>
 
             </View>
             </TouchableOpacity>
 
 
              <TouchableOpacity
                 onPress={()=>{
                    <Select_Day_Orders/>
                 }}
              >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:23,fontWeight:'bold',color:'#000'}}>طلبات الشهر</Text>
 
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
 
               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
               </View>
             </View>
             </TouchableOpacity>
 
 
             <TouchableOpacity
                 onPress={()=>{
                   this.props.navigation.navigate("Insert_Order")
                   this.setState({Drawer_Visible:false})
                 }}
              >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>حجز عريس{'\n'}او طوارىء</Text>
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
               <Icon name="utensils" size={27} style={{marginLeft:16}}/>
               </View>
             </View>
             </TouchableOpacity>
 
 
 
               <TouchableOpacity
                 onPress={()=>{
                   this.props.navigation.navigate("Change_Work_Time")
                   this.setState({Drawer_Visible:false})
                 }}
               >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:22,fontWeight:'bold',color:'#000'}}>مواعيد العمل</Text>
 
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
               </View>
             </View>
             </TouchableOpacity>
          </View>
          </View>
       ) :
       null
       }

              
         <ScrollView >
                       
                   
          
            <View style={styles.text_input}>
            
              <TextInput 
                style={{ fontSize: 20,textAlign:'center', }}

                multiline={true}
                value={this.state.work_time}
                onChangeText={(value) => {
                  this.setState({ work_time: value })
                }}
              />
            </View>
             
         

              <TouchableOpacity
            onPress={()=>{
               this.Update_Data()
              
            }}
          >
          <View style={{
            width:windowWidth*.55,
            height:50,
            backgroundColor:'#FFDDDE',
            borderRadius:15,
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',  
            marginTop:windowWidth*.3
          }}>
              <Text style={{fontSize:22,fontWeight:'bold',color:'#000'}}>حفظ</Text>
          </View>
          </TouchableOpacity>



                    </ScrollView>

    </>
   )
}

  
        </>
    )
}
}

const styles = StyleSheet.create({
   
    text_input: {
        width: windowWidth * .88,
      //  height:110,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 8,
        paddingBottom:10,
        // flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
        marginTop:windowWidth*.1,
        // marginBottom:20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      
        elevation: 3,
          
      },
    header: {
        width: '100%',
        height: '8%',   //windowHeight * .08
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
      },
      drwer_view:{
        width:windowWidth*.77,
        height:windowHeight*.1,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'flex-end',
        flexDirection:'row',
        marginTop:23,
        shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    
      elevation: 3,
        
      },
      style_view:{
        width:windowWidth*.88,
        height:50,
      // backgroundColor:'#ddd',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingRight:10,
       },
       view_date: {
        width: windowWidth * .65,
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
        shadowColor: "#C8C7CA",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row'
    
      },


});


