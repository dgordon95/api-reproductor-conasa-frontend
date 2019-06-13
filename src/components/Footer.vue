  <template>
  <div >
        <footer class="footer">
          <div id="share">
              <a v-bind:href="twitterUrl" target='_blank'><img v-bind:src="imageSrc"   class=" imgShare" alt="Kitten"></a>
              <a v-bind:href="linkedinUrl" target='_blank'><img v-bind:src="imageSrc2"   class=" imgShare" alt="Kitten"></a>
              <a v-bind:href="facebookUrl" target='_blank'><img v-bind:src="imageSrc3"   class=" imgShare" alt="Kitten"></a>
              
          </div>
          <div id="mt-8">
                <p>&copy; 2019 Copyright: Daniel Gordon</p>
              </div>
        </footer>
      
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
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  background-color:rgb(58, 53, 53);
  color: white;
  text-align: center;
  margin-top: 80px;
height: 107;
}
#mt-8{ 
   background-color:rgb(31, 34, 34);
   font-size: 14;
}
#share{
    padding-top: 18px;
    
}
.imgShare{
   position: static;
   width: 50px;

    padding-bottom: 18px;
   }
  

</style>