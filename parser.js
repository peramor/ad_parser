var https = require('https')
var request = require('request')
var url = "https://easylist-downloads.adblockplus.org/advblock.txt?&title=RU%20Adlist&requiresLocation=https://easylist-downloads.adblockplus.org/easylist.txt?&requiresTitle=EasyList";
var User = require('./user.model')
var _ = require('lodash')

setInterval(() => {
  console.time('search')
  User.find()
    .then(users => {
      request.get(url, (err, res, body) => {

        for (let user of users) {
          let userDomainsBlocked = []

          for (let domain of _.difference(user.domains, user.history.map(h => h.domain))) {
            if (body.search(domain) !== -1) {
              userDomainsBlocked.push(domain)
              user.history.push({ domain })
            }
          }

          if (userDomainsBlocked.length > 0) {
            sendMail(user.email, userDomainsBlocked)
            user.save()
          }
        }

        console.time('search')
      })

    })
}, 5*60*1000)

/**
 * Псевдо-функция отравки сообщения.
 * 
 * @param {string} email 
 * @param {string[]} domains список доменов
 */
function sendMail(email, domains) {
  setTimeout(() => {
    console.log(`
    Один или нескольо доменов попали в списки адблока:
    ${domains.join('\n')}
    `)
  }, 150)
}