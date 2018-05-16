/**
* @auther ymdengpeng@163.com
*
* @param {object} content
*   The props of content are below
*   toastMsg: the text of the toast
*   position: the position of the toast
*   color: the background color of the toast
*/
<template>
  <transition name="anim-toast">
    <div class="ui-toast" v-show="show" :class="classObject">
      <p>{{showText}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      content: {
        type: Object,
        default: {
          toastMsg: '',
          position: 'middle',
          color: ''
        }
      }
    },
    data() {
      return {
        show: false,
        showText: '',
        showTimer: null,
      }
    },
    computed: {
      classObject() {
        return {
          'place-top': this.content.position === 'top',
          'place-bottom': this.content.position === 'bottom',
          'place-middle': this.content.position === 'middle'
        }
      }
    },
    watch: {
      content() {
        this.showText = this.content.toastMsg;
        if(this.showText === '') {
          this.show = false;
        } else {
          this.show = true;
          this.hideToast();
        }
      }
    },
    methods: {
      hideToast() {
        clearTimeout(this.showTimer);
        this.showTimer = setTimeout(() => {
          this.show = false;
        }, 2000);
      }
    },
    destroyed() {
      this.show = false;
      this.showText = '';
    }
  }
</script>

<style lang="scss" scoped>
  .ui-toast {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    opacity: 1;

    p {
      padding: 20px 50px;
      max-width: 80%;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      font-size: 28px;
      word-break: break-all;
      pointer-events: auto;
    }

    &.place-top {
      margin-top: 160px;
      justify-content: flex-start;
    }

    &.place-middle {
      justify-content: center;
    }

    &.place-bottom {
      margin-top: -200px;
      justify-content: flex-end;
    }

    &.blue {
      p {
        padding: 20px 70px;
        background: #4D7BFE;
        box-shadow: 0 4px 14px 0 rgba(77, 123, 254, 0.40);
        border-radius: 100px;
        font-size: 28px;
      }
    }

  }

  .anim-toast-enter-active {
    transition: all .3s ease;
  }

  .anim-toast-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .anim-toast-enter, .anim-toast-leave-to {
    opacity: 0;
  }
</style>
