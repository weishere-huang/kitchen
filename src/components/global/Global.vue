<script>
const apiSrc = "http://192.168.1.104:8861";
const apiImg = "/api";
// const apiImg = "http://192.168.1.104:8861/api";
const imgPath = sessionStorage.getItem("imgPath");
const versionNumber = "3.0.0.190606_alpha";
//测试环境地址
// const apiSrc = "http://192.168.1.106:8861";
// const apiImg = "http://192.168.1.106:8861";
// const imgPath = sessionStorage.getItem("imgPath");
//外网地址
// const apiSrc = "http://118.25.217.48:8861";
// const apiImg = "http://118.25.217.48:8861";
// const imgPath = sessionStorage.getItem("imgPath");
export default {
	apiSrc,
	imgPath,
	apiImg,
	versionNumber
};
</script>
