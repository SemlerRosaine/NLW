module.exports = async function(db,{proffyValue, classValue, classScheduleValues} ){
    //inserir dados na tabela de professores
    //javascript executa linha a linha, então peço para que ele espere a partir do await que economica um then
    //a crase = template literal serve para poder quebrar a linha
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name, 
            avatar, 
            Wwhatsapp, 
            bio

        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"

        );
    
    
    
    
    `)

    const proffy_id = insertedProffy.lastID



    //inserir dados na tabela classes

    const insertedClass = await db.run(`
    
            INSERT INTO classes (
                subject,
                cost,
                proffy_id

            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"

            );
    `)

    const class_id = insertedClass.lastID

    //inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues =  classScheduleValues.map((classScheduleValue) => {//foreach itera sobre cada elemento sem retorno/o map faz retorno agrupando em um array
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)


    })

    //executa todos os db runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)



}