function add(selection) { return document.querySelector(`#${selection}`) };
function addAll(selection) { return document.querySelectorAll(selection) };

var element = {
  body: add("body"),
  menu: add("menu"),
  title: add("title"),
  startPause: add("startPause"),
  touchStartPause: add("touchStartPause"),
  touchQuit: add("touchQuit"),
  touchFire: add("touchFire"),
  touchMove: add("touchMove"),
  spaceAttack: add("spaceAttack"),
  shellGameTopTxt: add("shellGameTopTxt"),
  shellShuttle: add("shellShuttle"),
  topCover: add("topCover"),
  bottomCover: add("bottomCover"),
  centerTxt: add("centerText"),
  gameTopTxt: add("gameTopTxt"),
  lives: add("lives"),
  level: add("level"),
  score: add("score"),
  shuttle: add("shuttle"),
  shuttleLaser: add("shuttleLaser"),
  aliens: add("aliens"),
  aliensLaser: add("aliensLaser"),
  shields: add("shields"),
  shieldsAll: addAll("#s1Part1, #s1Part2, #s1Part3, #s2Part1, #s2Part2, #s2Part3, #s3Part1, #s3Part2, #s3Part3"),
  shield1: add("shield1"),
  shield2: add("shield2"),
  shield3: add("shield3"),
  shield_1: addAll("#shield1 *"),
  shield_2: addAll("#shield2 *"),
  shield_3: addAll("#shield3 *"),
  aliensLine1: add("line1"),
  aliensLine_2: addAll("#line2 *"),
  aliensLine_1: addAll("#line1 *"),
  aliensLines: [addAll("#line1 *"), addAll("#line2 *")]
};
