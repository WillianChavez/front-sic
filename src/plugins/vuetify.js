import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '../assets/scss/index.scss'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            //Se definen colores globales para el tema claro
            light : {
                bluePrincipal:'#175EFB',   
                blueGrayPrincipal:'#6A83BE',   
                blueDarkPrincipal:'#090A0D',
                bgPrincipal:'#F4F7FD',
                bgWhite:"#FFFFFF",
                primary: '#175EFB',
            },
            dark:{
                bgPrincipal:'#2f3032',
                bluePrincipal:'#175EFB',   
                blueGrayPrincipal:'#6A83BE',   
                blueDarkPrincipal:'#090A0D',
                primary: '#175EFB'
                // primary: {
                //     base: colors.purple.base,
                // }
            }
        }
    }
});
