

// import * as React from "react";
// import {
//   Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,
//   ActivityIndicator
// } from 'react-native'

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Dimensions } from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

// import axios  from "axios";

// import Select_Day_Orders from '../Tasks/Select_Day_Orders'

//  class Screens extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         Drawer_Visible:false,
//     }
//   } 

//   render(){
//       return(
//           <>
//            <StatusBar
//           backgroundColor="#fff"  //#FF6C00
//           barStyle="dark-content"
//         />
  
//              <View style={{
//            width:windowWidth*.77,
//            height:windowHeight*.98,
//            backgroundColor:'#fff',
//            shadowColor: "#000",
//            position:'relative',
//            borderBottomEndRadius:15,
//             borderTopRightRadius:15,
//            marginTop:7,
//           shadowOffset: {
//             width: 0,
//             height: 1,
//           },
//           shadowOpacity: 0.22,
//           shadowRadius: 2.22,
//           elevation: 3,
//           alignItems:'center'
//            }}>

// <View style={styles.header}>
//       <TouchableOpacity
//         onPress={() => {
//         //   this.state.Drawer_Visible ==false ?(
//         //     this.setState({Drawer_Visible:true})
//         //   ):(
//         //     this.setState({Drawer_Visible:false})
//         //   )
//         // this.props.navigation.goBack()
         
//         }}
//       >
//         <Icon name="align-justify" size={26} style={{color:'#000'}} />
//       </TouchableOpacity>      
//     </View>
//             <Image source={require('../img/m.jpg')}
//                style={{width:120,height:120,borderRadius:60,resizeMode:'cover'}}
//             />
           
//            <TouchableOpacity
//              onPress={()=>{
//                this.setState({Drawer_Visible:false})
//              }}
//            >
//             <View style={styles.drwer_view}>
//               <Text style={{fontSize:23,fontWeight:'bold',color:'#000'}}>طلبات اليوم</Text>

//               <View style={{width:windowWidth*.29,justifyContent:'center',
//               alignItems:'center'}}>
//               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
//               </View>

//             </View>
//             </TouchableOpacity>


//              <TouchableOpacity
//                 onPress={()=>{
//                 //   this.props.navigation.navigate("Select_Day_Orders")
//                    <Select_Day_Orders/>
//                 }}
//              >
//             <View style={styles.drwer_view}>
//               <Text style={{fontSize:22,fontWeight:'bold',}}>Add Meal</Text>

//               <View style={{width:windowWidth*.29,justifyContent:'center',
//               alignItems:'center'}}>

//               <Icon name="utensils" size={27} style={{marginLeft:16}}/>
//               </View>
//             </View>
//             </TouchableOpacity>


//             <TouchableOpacity
//                 onPress={()=>{
//                   this.props.navigation.navigate("Page6")
//                   this.setState({Drawer_Visible:false})
//                 }}
//              >
//             <View style={styles.drwer_view}>
//               <Text style={{fontSize:22,fontWeight:'bold',}}>Menu</Text>
//               <View style={{width:windowWidth*.29,justifyContent:'center',
//               alignItems:'center'}}>
//               <Icon name="utensils" size={27} style={{marginLeft:16}}/>
//               </View>
//             </View>
//             </TouchableOpacity>



//               <TouchableOpacity
//                 onPress={()=>{
//                   this.props.navigation.navigate("Page3")
//                   this.setState({Drawer_Visible:false})
//                 }}
//               >
//             <View style={styles.drwer_view}>
//               <Text style={{fontSize:22,fontWeight:'bold',}}>All Orders</Text>

//               <View style={{width:windowWidth*.29,justifyContent:'center',
//               alignItems:'center'}}>
//               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
//               </View>
//             </View>
//             </TouchableOpacity>
//          </View>


//           </>
//       )
//   }
// }


// export default createAppContainer(
//     createStackNavigator(
//     {
//      Screens:Screens,
//      Select_Day_Orders:Select_Day_Orders,
//     //  Insert_Order:Insert_Order,
//     },
//     {
//      headerMode: 'none'
//    },
//    {
//      initialRouteName: 'Screens'
//    }
//     ))



// const styles = StyleSheet.create({
//     header: {
//       width: '100%',
//       height: '8%',   //windowHeight * .08
//       backgroundColor: '#fff',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingLeft: 10,
//       paddingRight: 10,
//       flexDirection: 'row',
//     },
   
//     sub_view:{
//       width:'95%',
//       // height:windowHeight*.2,
//       // backgroundColor:'#0ff',
//       flexDirection:'row',
//       justifyContent:'space-between',
//       alignItems:'center',
//     },
//     drwer_view:{
//       width:windowWidth*.76,
//       height:windowHeight*.1,
//       alignItems:'center',
//       backgroundColor:'#fff',
//       justifyContent:'flex-end',
//       flexDirection:'row',
//       marginTop:23,
//       shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
  
//     elevation: 3,
   
//     },
//     header: {
//         width:windowWidth*.77,
//         height: '8%',   //windowHeight * .08
//         backgroundColor: '#fff',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingLeft: 10,
//         paddingRight: 10,
//         flexDirection: 'row',
//         borderTopRightRadius:15,
//       },
//   })

