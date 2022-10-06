const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('subGroup', async(req, resp) => {
    const schema = Joi.object({
        tipoProduto : Joi.string().min(1).max(50).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.SubGrupo.findAll({
        where : {
            tipoProduto : req.body.tipoProduto
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.SubGrupo.build({
        tipoProduto : req.body.tipoProduto,
    });

    await user.save();
    resp.end();
});

knl.get('subGroup', async(req, resp) => {
    const user = await knl.sequelize().models.SubGrupo.findAll();
    resp.send(user);
    resp.end();
});


knl.delete('subGroup', async(req, resp) => {

    knl.sequelize().models.SubGrupo.destroy({
        where : {
            idSub : req.body.idSub
        }
    });
    resp.end();
});
knl.put('subGroup', async(req,resp)=>{
    const result = await knl.sequelize().models.subGrupo.update({
        tipoProduto  : req.body.tipoProduto
    },{
        where : {
            idSub : req.body.idSub
        }
    })
    resp.send(result);
    resp.end();
});