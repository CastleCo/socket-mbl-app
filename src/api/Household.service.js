
export default class Service {
    constructor(rootUrl) {
        this.rootUrl = rootUrl;
    }
    
    // Creates a new household
    //
    // @param       String      name        the desired name of the household
    // @returns     Promise
    //  resolves if the household was successfully created
    //  rejects with ({ error: "error_type", message: "" }) if there was an error
    create = (name) => {
        return new Promise((resolve, reject) => {
            
        });
    }

    // TODO: leaves a household
    // 
    // @pre     user must be a part of the household
    leave = (householdId) => {
        return new Promise((resolve, reject) => {
            
        });
    }

    // TODO: transfers the ownership of a household
    // 
    // @pre     user must be the household owner
    // 
    transfer = (householdId) => {

    }

    // TODO: kicks a user out of a household
    // 
    // @pre     user performing the kick must be household owner
    kickOut = (householdId, userId) => {

    }

    // TODO: invites emails to a household
    // 
    // @pre     user must have the "can_invite" permission of the household
    sendInvite = (householdId, emails) => {
    }

    // TODO: rescinds an invite to a household
    // 
    // 
    rescindInvite = (householdId) => {

    }

    // TODO: rejects an invite to a household
    // 
    // 
    rejectInvite = (householdId) => {

    }
}