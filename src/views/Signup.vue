<template>
  <section class="hero is-fullheight is-light">
    <div class="hero-head">
      <div class="header">
        <nav class="nav">
          <div class="container">
            <div class="nav-left">
              <router-link class="nav-item is-brand" to="/index">
                <img src="../assets/logo.png" alt="E起赢">
              </router-link>
            </div>
            <span class="nav-toggle" :class="{'is-active': device.isMobile && menu.opened}" @click="toggleMenu(!menu.opened)">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div class="nav-right nav-menu" :class="{'is-active': device.isMobile && menu.opened}">
              <span class="nav-item is-tab">
                <router-link class="" to="/signup">注册</router-link>
              </span>
              <span class="nav-item is-tab">
                <router-link class="button is-primary" to="/signin">登陆</router-link>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-10 is-offset-1">
            <div class="columns section" v-if="isSuccess==false">
              <form class="column is-6 is-offset-3" @submit.prevent="validateForm">
                <h1 class="title has-text-centered">注册</h1>
                <div class="field">
                  <label class="label">* 登录名</label>
                  <p class="control">
                    <input name="name" class="input" :class="{'is-danger': errors.has('name')}" type="text" v-model="userForm.PanelLoginName" v-validate="'required'" placeholder="请输入登录名">
                    <span class="help is-danger" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">* 密码</label>
                  <p class="control">
                    <input name="password" class="input" :class="{'is-danger': errors.has('password')}" type="password" v-model="userForm.PanelPw" v-validate="'required'" placeholder="请填写密码">
                    <span class="help is-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">* 确认密码</label>
                  <p class="control">
                    <input name="rePassword" :class="{'is-danger': errors.has('rePassword')}" v-model="userForm.RPanelPw" v-validate="'required'" type="password" class="input" placeholder="请填写确认密码">
                    <span class="help is-danger" v-show="errors.has('password')">{{ errors.first('rePassword') }}</span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">* 邮箱</label>
                  <p class="control">
                    <input name="email" :class="{'is-danger': errors.has('email')}" v-model="userForm.PanelEmail" v-validate="'required'" type="email" class="input" placeholder="请填写邮箱">
                    <span class="help is-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">真实姓名</label>
                  <p class="control">
                    <input type="text" v-model="userForm.PanelRealName" class="input " placeholder="请填写真实姓名">
                  </p>
                </div>
                <div class="field">
                  <label class="label">* 生日</label>
                  <p class="control">
                    <span class="select">
                      <select :class="{'is-danger': errors.has('year')}" name="year" v-model="ageVal.year" v-validate="'required'" @change="changeAge('year')">
                        <option value="">请选择年</option>
                        <option :value="item" v-for="(item, index) in ageOptons.year">{{item}}</option>
                      </select>
                    </span>
                    <span class="select">
                      <select :class="{'is-danger': errors.has('month')}" name="month" v-model="ageVal.month" v-validate="'required'" @change="changeAge('month')">
                        <option value="">请选择月</option>
                        <option :value="item" v-for="(item, index) in ageOptons.month">{{item}}</option>
                      </select>
                    </span>
                    <span class="select">
                      <select :class="{'is-danger': errors.has('day')}" name="day" v-model="ageVal.day" v-validate="'required'">
                        <option value="">请选择日</option>
                        <option :value="item" v-for="(item, index) in ageOptons.day">{{item}}</option>
                      </select>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">* 性别</label>
                  <p class="control">
                    <!--<input type="text" name="sex" :class="{'is-danger': errors.has('sex')}" v-model="userForm.PanelSex" v-validate="'required'" class="input" placeholder="请填写真实姓名">-->
                    <radio-group v-model="userForm.PanelGender">
                      <radio val="1">男</radio>
                      <radio val="2">女</radio>
                    </radio-group>
                  </p>
                </div>
                <div class="field">
                  <label class="label">* 所在城市</label>
                  <p class="control">
                    <span class="select" style="width:150px">
                      <select :class="{'is-danger': errors.has('Panelprovince')}" name="Panelprovince" v-validate="'required'" v-model="userForm.Panelprovince" @change="queryByParenterCode(userForm.Panelprovince)">
                        <option value="">请选择省</option>
                        <option :value="item.value" v-for="(item, index) in provinceOptions">{{item.label}}</option>
                      </select>
                    </span>
                    <span class="select" style="width:150px">
                      <select :class="{'is-danger': errors.has('PanelCity')}" name="PanelCity" v-model="userForm.PanelCity" v-validate="'required'">
                        <option value="">请选择市</option>
                        <option :value="item.value" v-for="(item, index) in cityOptions">{{item.label}}</option>
                      </select>
                    </span>
                    <!--<span class="help" v-show="errors.has('PanelCity')">{{ errors.first('PanelCity') }}</span>-->
                  </p>
                </div>
                 <div class="field">
                  <label class="label">是否拥有汽车</label>
                  <p class="control">
                    <radio-group v-model="hasCar">
                      <radio val="1">是</radio>
                      <radio val="0">否</radio>
                    </radio-group>
                  </p>
                </div>
                 <template v-if="hasCar==='1'">
                   <div class="field">
                  <label class="label">汽车品牌</label>
                  <p class="control">
                    <input name="carBrand" :class="{'is-danger': errors.has('carBrand')}" v-model="userForm.carBrand" v-validate="'required'" type="text" class="input" placeholder="请填写汽车品牌">
                    <span class="help is-danger" v-show="errors.has('carBrand')">{{ errors.first('carBrand') }}</span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">汽车型号</label>
                  <p class="control">
                    <input name="carModels" :class="{'is-danger': errors.has('carModels')}" v-model="userForm.carModels" v-validate="'required'" type="text" class="input" placeholder="请填写汽车型号">
                    <span class="help is-danger" v-show="errors.has('carModels')">{{ errors.first('carModels') }}</span>
                  </p>
                </div>
                 <div class="field">
                  <label class="label">汽车购买日期</label>
                  <p class="control">
                    <span class="select">
                      <select :class="{'is-danger': errors.has('carYear')}" name="carYear" v-model="carDateVal.year" v-validate="'required'" @change="changeCarDate('year')">
                        <option value="">请选择年</option>
                        <option :value="item" v-for="(item, index) in carDateOptions.year">{{item}}</option>
                      </select>
                    </span>
                    <span class="select">
                      <select :class="{'is-danger': errors.has('carMonth')}" name="carMonth" v-model="carDateVal.month" v-validate="'required'" @change="changeCarDate('month')">
                        <option value="">请选择月</option>
                        <option :value="item" v-for="(item, index) in carDateOptions.month">{{item}}</option>
                      </select>
                    </span>
                    <span class="select">
                      <select :class="{'is-danger': errors.has('carDay')}" name="carDay" v-model="carDateVal.day" v-validate="'required'">
                        <option value="">请选择日</option>
                        <option :value="item" v-for="(item, index) in carDateOptions.day">{{item}}</option>
                      </select>
                    </span>
                  </p>
                </div>
                 </template>
                <div class="field">
                  <label class="label">* 手机号</label>
                  <!--<p class="control">
                      <input name="mobile" :class="{'is-danger': errors.has('mobile')}" v-model="userForm.PanelMobile" v-validate="'required'" type="number" class="input" placeholder="请填写手机号">
                      <span class="help is-danger" v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>
                    </p>-->
                    <div class="control">
                      <div class="control has-addons">
                        <input class="input is-expanded" name="mobile" type="number" placeholder="请输入你的手机号" v-model="userForm.PanelMobile" v-validate="'required'" :class="{'is-danger': errors.has('mobile')}">
                        <button class="button is-primary" type="button" :disabled="num>0" @click="checkMobile" v-text="btnText"></button>
                      </div>
                    </div>
                    <span class="help is-danger" v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>
                </div>
  
                <div class="field">
                  <label class="label">* 短信验证码</label>
                  <p class="control">
                    <input type="text" v-model="userForm.MobileCode" name="ValidateCode" class="input" :class="{'is-danger': errors.has('ValidateCode')}" placeholder="请填写短信验证码" v-validate="'required'">
                    <span class="help is-danger" v-show="errors.has('ValidateCode')">{{ errors.first('ValidateCode') }}</span>
                  </p>
                </div>
  
                <div class="field">
                  <label class="checkbox">
                    <input name="check" v-validate="'required'" type="checkbox" checked> 同意一起赢
                  </label>
                  <a class="agreement-btn" @click="showAgreement=true">用户注册协议</a>
                  <span class="help is-danger" data-vv-as="用户注册协议" v-show="errors.has('check')">请勾选用户注册协议</span>
                </div>
                <div class="field">
                  <label class="label">个人介绍</label>
                  <p class="control">
                    <textarea type="text" row="3" v-model="userForm.PanelRemark" class="textarea" placeholder="请填写个人介绍" />
                  </p>
                  <p class="control">
                    <button class="button is-primary is-fullwidth is-medium" type="submit">提交</button>
                  </p>
                </div>
              </form>
            </div>
            <div v-else class="section msg-box has-text-centered">
              <div class="success-heading">
                <i class="iconfont icon-chenggong1 icon is-success"></i>
                <h2 class="title">注册成功</h2>
              </div>
              <div class="content">
                <p class="desc">您已成功注册一起赢生活社区，请在24小时内点击下面的“验证邮箱”按钮，完成注册过程。</p>
                <p>
                  <router-link class="button is-outlined is-medium" to="/signin">马上登陆</router-link>
                  <a :href="getEmailUrl()" class="button is-primary is-success is-medium" target="_blank">验证邮箱</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    <div class="hero-foot">
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            Copyright © 2016 EQYING Inc. All Rights Reserved 京ICP备14016765号-2
          </div>
        </div>
      </footer>
    </div>
    <modal title="用户注册协议" :is-show="showAgreement" transition="fadeDown" @close="showAgreement=false">
      <div class="content">
  
        <h4 class="has-text-centered">E起赢网站会员注册协议</h4>
        <p>在您注册成为本网站的会员之前，请您认真阅读E起赢网站（以下称本社区）会员注册协议。您必须完全同意以下所有条款，方能成为本网站的会员。</p>
  
        <p>1.1 用户在使用本社区的服务之前，应当仔细阅读本协议，并同意遵守本协议及所有社区规则后方可成为本社区会员，一旦用户注册成功，则用户与本社区之间自动形成协议关系，用户应当遵守本协议及所有社区规则的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。未同意本协议内容的用户，无法在本社区发布任何内容，仅能使用浏览功能。</p>
  
        <p>1.2 本协议、社区规则可由本社区随时更新，用户在使用本社区产品时应当及时关注，用户同意本社区不承担通知义务。本社区的通知、公告、声明或其它类似内容是本协议及社区规则的一部分。</p>
  
        <p>2.1 本社区网络服务的具体内容由本社区根据实际情况提供，例如活动、礼品兑换等。</p>
  
        <p>2.2 本社区提供的部分网络服务为收费的网络服务，用户使用收费网络服务需要向本社区支付一定的费用。对于收费的网络服务，本社区会在用户使用之前给予用户明确的提示，只有用户根据提示确认其愿意支付相关费用，用户才能使用该等收费网络服务。如用户拒绝支付相关费用，则本社区有权不向用户提供该等收费网络服务。</p>
  
        <p>2.3 本社区仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。
        </p>
        <p>3.1 用户可通过以下方式注册成为本社区的正式用户：
          <ul>
            <li>(1)经本社区会员系统完成注册程序并通过身份认证的用户；</li>
            <li>(2)经社区批准的第三方合作网站登录的的用户；</li>
          </ul>
          成为正式用户即获得本社区规定用户所应享有的一切权限；未经认证仅享有本社区规定的部分会员权限。本社区有权对会员的权限设计进行变更。</p>
  
        <p>3.2 如发现用户帐号中含有不雅文字或不恰当名称的，本社区保留取消其用户资格的权利，相应后果由用户自行承担。
          <ul>
            <li>(1)请勿以党和国家领导人或其他社会名人的真实姓名、字号、艺名、笔名注册；</li>
            <li>(2)请勿以国家机构或其他机构的名称注册；</li>
            <li>(3)请勿注册不文明、不健康名字，或包含歧视、侮辱、猥亵类词语的帐号；</li>
            <li>(4)请勿注册易产生歧义、引起他人误解或其它不符合法律规定的帐号。</li>
          </ul>
        </p>
        <p>
          3.3 如发现用户的头像、简介等个人信息中包含违法和不良信息的，本社区保留取消其用户资格的权利。</p>
  
        <p>3.4 用户帐号的所有权归本社区，用户仅享有使用权。未经本社区许可，任何人不得赠与、借用、租用、转让或售卖账号，或者以其他方式许可非初始申请注册人使用账号。</p>
        <p>3.5 用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本社区不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本社区。因黑客行为或用户的保管疏忽导致帐号非法使用，本社区不承担任何责任。</p>
  
        <p>4.1 遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》、《信息网络传播权保护条例》和《互联网用户账号名称管理规定》等有关计算机互联网规定和知识产权的法律和法规、实施办法。</p>
  
        <p>4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本社区任何页面发布、转载、传送含有下列内容之一的信息，否则本社区有权自行处理并不通知用户：
          <ul>
            <li>(1)违反宪法确定的基本原则的；</li>
            <li>(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；</li>
            <li>(3)损害国家荣誉和利益的；</li>
            <li>(4)煽动民族仇恨、民族歧视，破坏民族团结的；</li>
            <li>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
            <li>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
            <li>(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</li>
            <li>(8)侮辱或者诽谤他人，侵害他人合法权益的；</li>
            <li>(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</li>
            <li>(10)以非法民间组织名义活动的；</li>
            <li>(11)含有法律、行政法规禁止的其他内容的。</li>
          </ul>
        </p>
  
        <P>4.3 用户承诺对其发表或者上传于本社区的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本社区被第三人索赔的，用户应全额补偿本社区一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；</P>
  
        <p>4.4 当第三方认为用户发表或者上传于本社区的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本社区发送权利通知书时，用户同意本社区可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本社区将不会自动恢复上述删除的信息；
          <ul>
            <li>(1)不得为任何非法目的而使用网络服务系统；</li>
            <li>(2)遵守所有与网络服务有关的网络协议、规定和程序；</li>
            <li>(3)不得利用本社区服务进行任何可能对互联网的正常运转造成不利影响的行为；</li>
            <li>(4)不得利用本社区服务进行任何不利于本社区的行为。</li>
          </ul>
        </p>
  
        <p>4.5 如用户在使用网络服务时违反上述任何规定，本社区有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。
        </p>
        <p>5.1 本社区不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本社区的非公开内容，但下列情况除外：
          <ul>
            <li>(1)事先获得用户的明确授权；</li>
            <li>(2)根据有关的法律法规要求；</li>
            <li>(3)按照相关政府主管部门的要求；</li>
            <li>(4)为维护社会公众的利益。</li>
          </ul>
        </p>
  
        <p>5.2 本社区可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本社区同等的保护用户隐私的责任，则本社区有权将用户的注册资料等提供给该第三方。</p>
        <p>5.3 在不透露单个用户隐私资料的前提下，本社区有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
        <p>
          6.1 用户发表并将其上传到本网站的任何内容，本社区在全世界范围内不限形式和载体地享有永久的、不可撤销的、免费的、非独家的使用权和转授权的权利，包括但不限于修改、复制、发行、展览、改编、汇编、出版、翻译、信息网络传播、广播、表演和再创作及著作权法等法律法规确定的其他权利。</p>
        <p>
          6.2 本社区特有的标识、版面设计、编排方式等版权均属本社区享有，未经本社区许可，不得任意复制或转载。</p>
  
        <p>6.3 用户从本社区的服务中获得的信息，未经本社区许可，不得任意复制或转载。</p>
        <p>
          6.4 使用本社区的任何内容均应注明"来源于E起赢社区(www.eqiying.com)"及署上作者姓名，按法律规定需要支付稿酬的，应当通知本社区及作者及支付稿酬，并独立承担一切法律责任。</p>
        <p>
          6.5 本社区享有所有作品用于其它用途的使用权和优先权，包括但不限于网站、电子杂志、平面出版等，作者在本社区发布内容时视为同意本条款。</p>
        <p>
          6.6 本社区所有内容仅代表作者自己的立场和观点，与本社区无关，由作者本人承担一切法律责任。</p>
  
        <p>6.7 恶意转载本社区内容的，本社区保留将其诉诸法律的权利。</p>
        <p>
          7.1 用户明确同意其使用本社区网络服务所存在的风险及一切后果将完全由用户本人承担，本社区对此不承担任何责任。</p>
  
        <p>7.2 本社区无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。</p>
  
        <p>7.3 本社区不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本社区实际控制的任何网页上的内容，本社区不承担任何责任。</p>
  
        <p>7.4 对于因不可抗力或本社区不能控制的原因造成的网络服务中断或其它缺陷，本社区不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
  
        <p>7.5 对于本社区向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本社区无需承担任何责任：
          <ul>
            <li>(1)本社区向用户免费提供的各项网络服务；</li>
            <li>(2)本社区向用户赠送的任何产品或者服务；</li>
            <li>(3)本社区向收费网络服务用户附赠的各种产品或者服务。</li>
          </ul>
        </p>
        <p>7.6 本社区有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本社区对用户和任何第三人均无需承担任何责任。</p>
        <p>8.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
        <p>8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
        <p>8.3 本协议解释权及修订权归北京一起赢科技有限公司所有</p>
      </div>
      <div slot="footer">
        <a class="button is-primary" @click="showAgreement=false">我已阅读</a>
      </div>
    </modal>
  </section>
</template>

<script>
import api from "src/api/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  // name: 'signup',
  data() {
    return {
      isSuccess: false,
      num: 0,
      userForm: {
        PanelLoginName: "",
        PanelPw: "",
        RPanelPw: "",
        PanelEmail: "",
        PanelCode: "",
        PanelRealName: "",
        PanelRemark: "",
        PanelWebId: "1",
        Panelprovince: "",
        PanelCity: "",
        PanelGender: "1",
        PanelBirthday: "",
        PanelMobile: ""
      },
      provinceOptions: [],
      cityOptions: [],
      ageOptons: {
        year: [],
        month: [],
        day: []
      },
      ageVal: {
        year: "1985年",
        month: "1月",
        day: "1日"
      },
      carDateOptions: {
        year: [],
        month: [],
        day: []
      },
      carDateVal: {
        year: "2010年",
        month: "1月",
        day: "1日"
      },
      showAgreement: false,
      hasCar: "1"
    };
  },
  computed: {
    ...mapGetters({
      current: "current",
      device: "device",
      menu: "menu"
    }),
    btnText() {
      return this.num === 0 ? "获取短信验证码" : this.num + "秒后重新获取";
    }
  },
  created() {
    this.queryByParenterCode("100000");

    const year = new Date().getFullYear() + 1;
    for (let i = year - 99; i < year; i++) {
      this.ageOptons.year.push(i + "年");
      this.carDateOptions.year.push(i + "年");
    }
    for (let i = 1; i < 13; i++) {
      this.ageOptons.month.push(i + "月");
      this.carDateOptions.month.push(i + "月");
    }

    this.changeAge("month");
    this.changeCarDate("month");
  },
  methods: {
    ...mapActions(["toggleMenu"]),
    getEmailUrl() {
      const { PanelEmail } = this.userForm;
      return "http://mail." + PanelEmail.split("@")[1];
    },
    validateForm() {
      this.$validator.validateAll().then((res) => {
        if(!res){
          return false
        }
        
        const { year, month, day } = this.ageVal;
        this.userForm.PanelBirthday =
          parseInt(year) + "-" + parseInt(month) + "-" + parseInt(day);

        if (this.hasCar === "1") {
          const { year, month, day } = this.carDateVal;
          this.userForm.carBuyDate =
            parseInt(year) + "-" + parseInt(month) + "-" + parseInt(day);
        }

        const { inviteUser, misc } = this.$route.query;

        if (inviteUser) {
          this.userForm.inviteUser = inviteUser;
        }

        if (misc) {
          this.userForm.misc = misc;
        }

        api
          .signup({ ...this.userForm })
          .then(res => {
            const { msg, result } = res.data;
            if (result !== "ok") {
              this.$notify.warning({ content: msg || "注册失败" });
              return false;
            }

            // this.$notify.success({ content: msg || '注册成功' });
            // this.$router.push({ path: '/signin' })
            this.isSuccess = true;
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    queryByParenterCode(ParenterCode) {
      api.queryByParenterCode({ ParenterCode }).then(res => {
        const { msg, result, data } = res.data;
        if (result !== "ok") {
          this.$notify.warning({ content: msg || "查询省市失败" });
          return false;
        }

        const options = data.map(item => {
          return {
            value: item.ParamsValues,
            label: item.ParamsName
          };
        });
        // this.provinceOptions =
        if (ParenterCode === "100000") {
          this.provinceOptions = options;
          this.userForm.PanelCity = "";
        } else {
          this.cityOptions = options;
        }
      });
    },
    changeAge(type) {
      if (type === "month") {
        this.ageOptons.day = [];
        // this.ageVal.day = ''
        const { year, month } = this.ageVal;
        const dayLength =
          new Date(parseInt(year), parseInt(month), 0).getDate() + 1;
        for (let i = 1; i < dayLength; i++) {
          this.ageOptons.day.push(i + "日");
        }
      }
    },
    changeCarDate(type) {
      if (type === "month") {
        this.carDateOptions.day = [];
        // this.ageVal.day = ''
        const { year, month } = this.carDateVal;
        const dayLength =
          new Date(parseInt(year), parseInt(month), 0).getDate() + 1;
        for (let i = 1; i < dayLength; i++) {
          this.carDateOptions.day.push(i + "日");
        }
      }
    },
    checkMobile() {
      const { userForm: { PanelMobile } } = this;

      if (!PanelMobile) {
        // this.errors.add('mobile', '请填写手机号')
        return false;
      }

      api
        .checkUnique({
          TypeId: "1",
          strWord: PanelMobile
        })
        .then(res => {
          const { msg, result, OK } = res.data;
          if (result !== "ok" && result !== "NotExist") {
            this.$notify.warning({ content: "该手机号已存在，请重试" });
            return false;
          }

          this.sendMsg();
        });
    },
    sendMsg() {
      this.num = 60;
      const timer = setInterval(() => {
        if (this.num === 0) {
          clearInterval(timer);
        } else {
          this.num--;
        }
      }, 1000);

      const { PanelMobile } = this.userForm;
      api
        .sendSms({ PanelMobiles: PanelMobile })
        .then(res => {
          const { msg, result, OK } = res.data;

          if (OK || result == 1) {
            this.$notify.success({ content: "验证码发送成功，请注意查收" });
          } else {
            this.$notify.warning({ content: "验证码发送失败，请稍候重试！" });
          }
        })
        .catch(error => {
          this.$notify.warning({ content: "验证码发送失败，请稍候重试！" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 15px;
}

.select {
  select {
    width: 100%;
  }
}

.agreement {
  &-btn {
    position: relative;
    top: -2px;
  }
}
</style>
