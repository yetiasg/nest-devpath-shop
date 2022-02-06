<template>
    <section>

        <div class="infoBox">
          {{message}}
        </div>

    </section>
</template>
<script>


export default {

    data(){
      return {
        message: 'Orders'
      }
    },
    mounted(){
        this.$store.dispatch('tryLogin')
    }
}
</script>

<style scoped>
    .infoBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .ellipseBottom, .ellipseTop{
        position: fixed;
        z-index: -1;
        overflow: hidden;
    }
    
    @media screen and (max-width: 360px) {
        .ellipseTop{
            width: 200%;
            height: 10rem;
            top: calc(-10rem + calc((100vh - 85vh)/2) - 2px);
        }

        .ellipseBottom{
            width: 200%;
            height: 10rem;
            bottom: calc(-10rem + calc((100vh - 85vh)/2) - 2px);
        }

        .indexPage {
            font-size: 0.8rem;
        } 

        .infoBox{
            width: 92%;
            min-height: 85vh;
        }
    }

    @media screen and (min-width: 361px) and (max-width: 768px){
        .ellipseTop{
            width: 180%;
            height: 10rem;
            top: calc(-10rem + calc((100vh - 84vh)/2) - 2px);
        }

        .ellipseBottom{
            width: 180%;
            height: 10rem;
            bottom: calc(-10rem + calc((100vh - 84vh)/2) - 2px);
        }

        .indexPage {
            font-size: 0.9rem;
        } 

        .infoBox{
            width: 88%;
            min-height: 84vh; 
        }
    }

    @media screen and (min-width: 768px) and (max-width: 1024px){
        .ellipseTop{
            width: 160%;
            height: 10rem;
            top: calc(-10rem + calc((100vh - 83vh)/2) - 2px);
        }

        .ellipseBottom{
            width: 160%;
            height: 10rem;
            bottom: calc(-10rem + calc((100vh - 83vh)/2) - 2px);
        }

        .indexPage {
            font-size: 1rem;
        } 

        .infoBox{
            width: 85%;
            min-height: 83vh;
        }
    }

    @media screen and (min-width: 1025px){
        .ellipseTop{
            width: 180%;
            height: 14rem;
            top: calc(-14rem + calc((100vh - 83vh)/2) - 2px);
        }

        .ellipseBottom{
            width: 180%;
            height: 14rem;
            bottom: calc(-14rem + calc((100vh - 83vh)/2) - 2px);
        }

        .indexPage {
            font-size: 1rem;
        } 

        .infoBox{
            width:85%;
            max-width: 1024px;
            min-height: 83vh;
        }
    }

    section{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
</style>