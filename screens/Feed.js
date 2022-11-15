import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";

let customFonts = {
  //criamos uma variável e definimos
  // “Bubblegum-Sans” como a chave e o caminho do arquivo .ttf como o valor.
  "Bubblegum-Sans": require("../assets/fonts/fonts/BubblegumSans-Regular.ttf"),
};

let stories = require("./temp_stories.json")

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //o estado falso pois nossas fontes não são carregadas inicialmente.
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    // função assíncrona chamando a função Font.loadAsync()
    //para carregar as fontes e, em seguida, definimos o estado como true.
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  //chamando no componentDidMount
  componentDidMount() {
    this._loadFontsAsync();
  }

  renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
//se as fontes estão carregadas ou não. Caso contrário,
// exibimos o componente <AppLoading/>.
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {

      return (/*primeiro definimos uma View pai com um estilo container*/
        <View style={styles.container}>          
          <SafeAreaView style={styles.droidSafeArea} />
{/* logotipo e o título do aplicativo na parte superior*/}
           <View style={styles.appTitle}>{/*Dentro dela, temos 2 views, uma para o nosso logo e outra para o título. */}
                <View style={styles.appIcon}>
                    <Image
                        source={require("../assets/logo.png")}
                        style={styles.iconImage}
                    >
                    </Image>
                </View>
                <View style={styles.appTitleTextContainer}> 
                    <Text style={styles.appTitleText}>
                        App Narração de Histórias
                    </Text>
                </View>
            </View>
{/*aqui temos outra view contendo nossa <FlatList>*/}
          <View style={styles.cardContainer}>
         
            <FlatList 
              keyExtractor={this.keyExtractor}
              data={stories}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //o Flex foi projetado para fornecer um layout consistente em diferentes tamanhos de tela
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,//uma altura de 7% do contêiner pai.
    flexDirection: "row",//as views dentro dela devem ser colocadas na mesma linha
  },
  appIcon: {
    flex: 0.3, //30% termos de largura de seu contêiner pai, que é 7% de todo o contêiner
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85, //100-7-8=85 7 do titulo e 8 da aba inferior
  },
});
