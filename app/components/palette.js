import Component from '@glimmer/component';
import { action ,set} from '@ember/object';

export default class NewColorComponent extends Component {
    
  colorarr=[ {hex:'#ffffff', rgb:'(255,255,255)', inverted:"#000000", name:"White"}, {hex:'#ffffff', rgb:'(255,255,255)' ,inverted:"#000000" , name:"White"}]
  hex=true;
  rgb=false;
  invertC="";
  R=0;
  G=0;
  B=0;
  colorToRemove=null;
   @action
   addcolor() {
     let code=this.code;
     let name=this.name;
     let rgb="";
     let hex="";
     
     if(code[0]==='#'){
         hex=code;
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(code);
        let r1= parseInt(result[1], 16);
        let g1= parseInt(result[2], 16);
        let b1= parseInt(result[3], 16);
        set(this,'R',r1);
        set(this,'G',g1);
        set(this,'B',b1);
        rgb="("+r1+","+g1+","+b1+")";
     }
     else{
          let [r,g,b]=code.split(",",3);
          r=parseInt(r);
          g=parseInt(g);
          b=parseInt(b);
          set(this,'R',r);
          set(this,'G',g);
          set(this,'B',b);
          rgb="("+code+")";
          hex="#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
     }
     let yiq = ((this.R * 299) + (this.G * 587) + (this.B * 114)) / 1000;
     set(this,'invertC',((yiq >= 128) ? 'black' : 'white'));
     this.colorarr.addObject({hex:hex, rgb:rgb, inverted: this.invertC, name:name});
     set(this,'code',"");
     set(this,'name',"");
  }

  @action
  setcolorToRemove(color) {
    set(this,'colorToRemove',color);
 }

 @action
 cancleRemove() {
    set(this,'colorToRemove',null);
}

  @action
  remove() {
    let obj=this.colorarr.findBy('hex', this.colorToRemove.hex)
    this.colorarr.removeObject(obj);
    this.cancleRemove();
 }

 @action
 makeHex(){
    set(this,'hex',true);
    set(this,'rgb',false);
 }

 @action
 makeRGB(){
    set(this,'rgb',true);
    set(this,'hex',false);
 }

 @action
 copyC(color){
     let copyT;
     if(this.hex){
        copyT=color.hex;
     }
     else{
        copyT=color.rgb;
     }
     navigator.clipboard.writeText(copyT);
 }

  
}

