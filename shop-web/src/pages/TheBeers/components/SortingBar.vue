 <template>
  <section class="sorting-bar">
    <p>sortuj</p>
    <base-button class="hideSortingBtn" mode="borderBtn" @click="showSorting">Sortuj</base-button>
    <div class="sorting">
      <ul>
        <li>Cena</li>
        <li>BLG</li>
        <li>IBU</li>
        <li>Data wypicia</li>
        <li>A-Z</li>
        <li>Z-A</li>
        <li>Ocena</li>
      </ul>
    </div>
    <div class="addBtn">
      <base-button mode="filledBtn">Dodaj piwo</base-button>
    </div>

    <div class="sorting-mobile" :class="!showModal ? 'hide' : ''">
      <ul>
        <li @click="showSorting">Cena</li>
        <li @click="showSorting">BLG</li>
        <li @click="showSorting">IBU</li>
        <li @click="showSorting">Data wypicia</li>
        <li @click="showSorting">A-Z</li>
        <li @click="showSorting">Z-A</li>
        <li @click="showSorting">Ocena</li>
      </ul>
    </div>
    <div @click="showSorting" :class="showModal ? 'hideBackend' : ''"></div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      showModal: false
    }
  },
  methods:{
    showSorting(){
      this.showModal = !this.showModal
    }
  }
}
</script>

<style scoped>
  .hide{
    display: none;
  }

  @media screen and (max-width:450px){
    .sorting-bar{
      margin: 1rem 0;
    }

    .sorting, p{
      display: none;
    }

    .sorting-mobile{
      z-index: 5;
      position: fixed;
      top: 10rem;
      left:calc(100%/2 - 30%);
      width: 60%;
      flex-grow: 1;
      padding: 1rem;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(100, 100, 100, 0.15);
    }

    li{
      margin: 0.7rem 0;
    }
    
    .hideBackend{
      position: fixed;
      top:0;
      left: 0;
      width:100%;
      min-height: 110vh;
      z-index: 1;
      background-color: rgba(194, 194, 194, 0.705);
    }

    section{
      position: absolute;
    }
  }

  @media screen and (min-width:451px){
    .hideSortingBtn,
    .sorting-mobile{
      display: none;
    }

    .sorting-bar{
      margin: 2rem 0 1rem 0;
    }
  }

  @media screen and (max-width:578px){
    .sorting-bar p{
      position: relative;
      top: -1.5rem;
      left: 0.3rem;
    }

    .sorting{
      margin: 0;
    }
  }

  @media screen and (min-width:579px){
    .sorting-bar p{
      position: absolute;
      top: -0.8rem;
      left: 0.3rem;
    }

    .sorting{
      margin: 0 1rem 0 0;
    }
  }

  .sorting-bar{
    width: 100%;
    min-height: 6rem;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .sorting-bar p{
    position: absolute;
  }

  .sorting{
    height: 100%;
    flex-grow: 1;
    padding: 1rem;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(100, 100, 100, 0.15);
  }

  ul{
    height: 100%;
    width: 100%;
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  li{
    padding:0.3rem;
    cursor: pointer;
    padding: 0 0.5rem;
  }

</style>