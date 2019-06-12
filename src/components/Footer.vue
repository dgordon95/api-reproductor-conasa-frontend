  <template>
  <div >
    <div id="footerId">
        <footer class="footer">
          <div id="share">
              <a v-bind:href="twitterUrl" target='_blank'><img v-bind:src="imageSrc"   class=" imgShare" alt="Kitten"></a>
              <a v-bind:href="linkedinUrl" target='_blank'><img v-bind:src="imageSrc2"   class=" imgShare" alt="Kitten"></a>
              <a v-bind:href="facebookUrl" target='_blank'><img v-bind:src="imageSrc3"   class=" imgShare" alt="Kitten"></a>
          </div>
        </footer>
        <div id="mt-8">
        <p>&copy; 2019 Copyright: Daniel Gordon</p>
        </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';
import {singout} from '../services/security.js';
import { liknedinUrl} from '../config/parameters';
import { baseUrlTwitter } from '../config/parameters';
import { facebookUrl } from '../config/parameters';
export default {
  data() {
    return {
        imageSrc: './assets/img/twitterIcon.png',
        imageSrc2: './assets/img/linkedinIcon.png',
        imageSrc3: './assets/img/facebookIcon.jpg',   
        twitterUrl:'',
        linkedinUrl:liknedinUrl,
        facebookUrl:facebookUrl
        };
        
  },
 
  name: "Footer",
  created(){
    axios.get(baseUrlTwitter)
      .then((response) => {
       
        this.twitterUrl=response.data;
      },
       (err) => {
         this.loading1 = false
        console.log(err)
      })
  },
};
</script>

<style>
footer {
 
  height: 80px;
  line-height: 60px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color:rgb(58, 53, 53);
  color: white;
  text-align: center;




}
#mt-8{ 
   background-color:rgb(31, 34, 34);
   font-size: 14;
  
}
#share{
    padding-top: 18px;
    padding-bottom: 18px;
}
.imgShare{
   position: static;
   width: 50px;

    padding-bottom: 18px;
   }
#footerId{
  margin-top: 20px;
  position: sticky;
  bottom: 0;
  width: 100%;
  }
  

</style>