/*** m-linear-progress.js alpha 0.00 ***/

// <m-linear-progress> 
export default class MLinearProgress extends HTMLElement {
   #shadow;#value;#min;#max;
   constructor() {
      super();
      this.#shadow = this.attachShadow({mode: 'open'});
      this.#value = undefined;
      this.#min = 0;
      this.#max = 100;
   }
   static get observedAttributes() {
      return ['value','min','max','label'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'value':
            this.#value = newValue;
            break;
         case 'min':
            this.#min = newValue;
            break;
         case 'max':
            this.#max = newValue;
            break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   set value(x){this.setAttribute('value', x)}
   set min(x)  {this.setAttribute('min', x)}
   set max(x)  {this.setAttribute('max', x)}
   get value(){return this.getAttribute('value')}
   get min()  {return this.getAttribute('min')}
   get max()  {return this.getAttribute('max')}
   #render() {
      let clamp = (min, max, num) => Math.max(min,Math.min(max,num));
      let min = this.#min || 0;
      let max = this.#max || 100;
      let progress = clamp(min, max, this.#value) || 0;
      let h = 5;
      this.#shadow.innerHTML = `
         <style>
            :host{
               display: block;
               margin: 8px 0;
               width: 100%;
               position: relative;
               height: var(--m-linear-progress-height,var(--m-progress-height,${h}px));
               box-sizing: border-box;
               overflow: hidden;
               border-radius: var(--m-radius);
            }
            :host::part(progress-background){
               left: 0;
               top: 0;
               position: absolute;
               width: 100%;
               height: 100%;
               background: var(--m-linear-progress-background,var(--m-progress-background,var(--m-surface-container-high)));
            }
            :host::part(progress){
               left: -${h}px;
               top: 0;
               position: absolute;
               height: 100%;
               background: var(--m-linear-progress-color,var(--m-progress-color,var(--m-primary)));
               width: calc(${progress}% + ${h}px);
               border-radius: var(--m-radius);
               z-index: 1;
               ${this.#value?'':'animation: loop 1s linear infinite;'}
            }
            @keyframes loop {
               0% {
                  width: 20%;
                  left: -20%;
               }
               50% {
                  width: 60%;
                  left: 0%;
               }
               100% {
                  width: 20%;
                  left: 100%;
               }
           nn }
         </style>
         <div part="progress-background"></div>
         <div part="progress"></div>
      `;
   }
}