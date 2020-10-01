require("dotenv").config();

const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {

    // console.log(oldMember);
    // console.log('--------------------------------');
    // console.log(newMember);
    console.log(oldMember.channelID);
    console.log(newMember.channelID);

    if ((oldMember.channelID === null) && (newMember.channelID !== null)) {
      switch (newMember.channelID) {
        case process.env.VC1ID:
          console.log('Joined VC1');
          break;
        case process.env.VC2ID:
          console.log('Joined VC2');
          break;
        case process.env.VC3ID:
          console.log('Joined VC3');
          break;
        case process.env.VC4ID:
          console.log('Joined VC4');
          break;
        default:
          break;
      }
    } else if ((oldMember.channelID !== null) && (newMember.channelID === null)) {
      console.log('Left a Channel');
    } else if ((oldMember.channelID !== null) && (newMember.channelID !== null)) {
      console.log('Switched Channel');
    }
  }
};
