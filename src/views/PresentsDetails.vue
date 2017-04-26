<template>
<div class="projects-page">
  <section class="hero is-medium banner user-banner"></section>
  <div class="section main">
      <div class="container">
        <div class="section">
          <div class="columns is-desktop">
            <div class="column is-8 is-offset-2">
              <h1 class="title">{{presentInfo.PresentName}}</h1>
              <div class="content">
                <p>{{presentInfo.PresentDesc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import api from 'src/api'

export default {
  data() {
    return {
      presentInfo: {}
    }
  },
  created(){
    const {id} = this.$route.params
    this.getProjectInfo(id)
  },
  methods: {
    getProjectInfo(id){
      api.getPresentInfo({id}).then(res => {
        const {msg, result, data} = res.data
        if(result!=='ok'){
          this.$notify.warning({content: msg})
          return false
        }

        this.presentInfo = data
      })
    }
  }
}
</script>

<style lang="scss">
.project {
    margin-bottom: 30px;
    vertical-align: top;
    margin-right: 30px;
    float: left;
    cursor: pointer;
    width: 100%;
}

.project figure {
    position: relative;
    display: inline-block;
    width: 100%;
}

.project figure figcaption {
    position: relative;
    z-index: 10;
    padding: 8px 18px 11px;
    background: #fff;
    -ms-transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    -o-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    text-align: left;
    color: #555;
}
.project figure:hover .actions {
    opacity: 1;
}

.project figure .actions {
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(29,29,29,.7);
    -ms-transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    -o-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
}

.project figure img {
    border: 0;
    width: 100%;
}
.btn-default bnt-action {
    margin: 0 0 auto;
}

figcaption .project-details {
    display: block;
    font-size: 16px;
    line-height: 33px;
    // color: #0093d0;
    height: 27px;
    width: 85%;
    margin-bottom: 5px;
    overflow: hidden;
}

figcaption .project-price {
    position: absolute;
    right: 15px;
    top: 12px;
    font-size: 22px;
    text-align: right;
    margin-top: 8px;
    letter-spacing: -1px;
    -webkit-font-smoothing: antialiased;
}

figcaption .project-creator {
    font-size: 13px;
    color: #545454;
    display: block;
}

figcaption .project-creator {
    font-size: 13px;
    color: #545454;
    display: block;
}

.project figure .actions button {
    padding: 13px 20px;
    font-size: 16px;
    top: 32%;
    position: absolute;
    left: 50%;
    width: 90%;
    margin-left: -45%;
    line-height: 18px;
    letter-spacing: 1px;
}

/*******section heading**********/
.center-heading {
    text-align: center;
    margin-bottom: 40px;
}

.center-heading h2 {
    margin-bottom: 0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #333;
    font-size: 25px;
}

.center-heading p {
    font-size: 20px;
    line-height: 35px;
}

.center-heading h2 strong {
    font-weight: 700;
}

.center-line {
    display: inline-block;
    width: 70px;
    height: 1px;
    border-top: 1px solid #bbb;
    /* border-bottom: 1px solid $skincolor; */
    margin: auto;
}

.center-heading p {
    margin-top: 10px;
}

.overflow-hidden {
    overflow: hidden;
}
</style>
