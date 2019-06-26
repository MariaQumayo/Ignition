/**
 * Jobs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
      title: { //product type
        type: 'string',
        required: 'true'
       /* enum: ['CellC LTE', 'Ignite Fibre', 'Ignite Fibre', 'Essentials Fibre', 'Neobraodband', 'SD Wan', 'Capped DSL', 'Uncapped DSL', 'DSL Add-on', 'Hosted Premium Email', 'Exchange Online', 'Secure Email', 'Archiving', 'Cloud PBX', 'Office365 Small Business', 'Office365 Enterprise', 'Cloud Backup', 'Sophos', 'Site Builder', 'Domains', 'Windows Hosting', 'Lunix Hosting', 'Cloud Server']*/
      },

      body: { //description
        type: 'string',
        required: 'true'
      },

      status:{ 
        //if notification is updated (less than 1 day ago) < 1 && is status is resolved display on front end
        type: 'string',
        required: 'true',
       /* enum: [issue(ted), resolved(blue), intermitent (orange), general(green)]*/
      }
    }
  };

  //show 10
  //if notifcation resolved hide edit option, what if issue comes back?