require('dotenv').config();


module.exports = async (reaction, user) => {
    console.log(user);
    // When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
    }
    
    if(reaction.emoji.name === '📌' && reaction.count === 1) {
        await reaction.message.pin({reason: 'Pinned by ' + reaction.client.user.username});
    }
	
}