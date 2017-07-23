// ==UserScript==
// @name         CHT Wanted Autofill
// @namespace    http://happyhacking.ninja/
// @version      0.1
// @description  shows how to use babel compiler
// @author       Kehao Chen
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.8.4/js-yaml.min.js
// @match        https://rmis.cht.com.tw/portal/*/biographical.jsp
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    // Your code here...
        function readConfigFile(evt) {
        let file = evt.target.files[0];
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onload = (evt) => {
            let contents = evt.target.result;
            setConfig(contents);
        };
        reader.readAsText(file);
    }

    function setConfig(contents) {
        let mConfig = jsyaml.load(contents);
        setSelect('yy', mConfig.yy.value);
        setSelect('mm', mConfig.mm.value);
        setSelect('dd', mConfig.dd.value);

        setBoolRadio('marry', mConfig.marry.value);
        setRadio('sex', mConfig.sex.value);
        setBoolRadio('injure_flg', mConfig.injure_flg.value);
        setBoolRadio('resident_flg', mConfig.resident_flg.value);
        setBoolRadio('staff_flg', mConfig.staff_flg.value);
        setBoolRadio('cht_emp', mConfig.cht_emp.value);

        setRadio('military', mConfig.military.value);
        setSelect('mili_stt_yy', mConfig.mili_stt_yy.value);
        setSelect('mili_stt_mm', mConfig.mili_stt_mm.value);
        setSelect('mili_stt_dd', mConfig.mili_stt_dd.value);
        setSelect('mili_stp_yy', mConfig.mili_stp_yy.value);
        setSelect('mili_stp_mm', mConfig.mili_stp_mm.value);
        setSelect('mili_stp_dd', mConfig.mili_stp_dd.value);

        setValue('addr_post', mConfig.addr_post.value);
        setValue('address', mConfig.address.value);
        setValue('now_post', mConfig.now_post.value);
        setValue('now_addr', mConfig.now_addr.value);
        setValue('mtel', mConfig.mtel.value);
        setValue('otel', mConfig.otel.value);
        setValue('htel', mConfig.htel.value);

        mConfig.degrees.value.forEach((degree, index) => {
            setSelect(`degree${index + 1}`, degree.degree.value);
            setValue(`sh${index + 1}`, degree.sh.value);
            setValue(`college${index + 1}`, degree.college.value);
            setSelect(`sh${index + 1}_stt_yy`, degree.sh_stt_yy.value);
            setSelect(`sh${index + 1}_stt_mm`, degree.sh_stt_mm.value);
            setSelect(`sh${index + 1}_stp_yy`, degree.sh_stp_yy.value);
            setSelect(`sh${index + 1}_stp_mm`, degree.sh_stp_mm.value);
        });

        setValue(`sh0`, mConfig.high_school.sh.value);
        setValue(`college0`, mConfig.high_school.college.value);
        setSelect(`sh0_stt_yy`, mConfig.high_school.sh_stt_yy.value);
        setSelect(`sh0_stt_mm`, mConfig.high_school.sh_stt_mm.value);
        setSelect(`sh0_stp_yy`, mConfig.high_school.sh_stp_yy.value);
        setSelect(`sh0_stp_mm`, mConfig.high_school.sh_stp_mm.value);

        mConfig.works.value.forEach((work, index) => {
            setValue(`company${index + 1}`, work.company.value);
            setValue(`office${index + 1}`, work.office.value);
            setSelect(`comp${index + 1}_stt_yy`, work.comp_stt_yy.value);
            setSelect(`comp${index + 1}_stt_mm`, work.comp_stt_mm.value);
            setSelect(`comp${index + 1}_stp_yy`, work.comp_stp_yy.value);
            setSelect(`comp${index + 1}_stp_mm`, work.comp_stp_mm.value);
            setValue(`duty${index + 1}`, work.duty.value);
            setValue(`salary${index + 1}`, work.salary.value);
        });

        setValue('professional', mConfig.professional.value);
        setValue('license', mConfig.license.value);
        setValue('lang_license', mConfig.lang_license.value);
        setValue('comment', mConfig.comment.value);
    }

    function setSelect(name, number) {
        number = number.toString();
        let formattedNumber = number.length < 2 ? ("0" + number).slice(-2) : number;
        $(`select[name=${name}]`).prop("disabled", false).val(formattedNumber);
    }
    function setBoolRadio(name, bool) {
        let answer = bool ? 'Y' : 'N';
        $(`input[name=${name}][value=${answer}]`).click();
    }
    function setRadio(name, answer) {
        $(`input[name=${name}][value=${answer}]`).click();
    }
    function setValue(name, value) {
        $(`input[name=${name}]`).val(value);
    }
    $('body').append('<input type="file" value="Load config file" id="file-input">');
    $('#file-input').change(readConfigFile);
/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */