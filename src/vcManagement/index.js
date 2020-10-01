require("dotenv").config();

const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {

    // console.log(oldMember);
    // console.log('--------------------------------');
    // console.log(newMember);
    console.log(oldMember.channelID);
    console.log(newMember.channelID);

    // Sometimes it's null, sometimes it's undefined... Why!!!!!!??????
    if ((oldMember.channelID === undefined) && (newMember.channelID !== undefined)) {
      console.log('Joined a Channel');
    } else if ((oldMember.channelID !== undefined) && (newMember.channelID === undefined)) {
      console.log('Left a Channel');
    } else if ((oldMember.channelID !== undefined) && (newMember.channelID !== undefined)) {
      console.log('Switched Channel');
    }
  }
};
