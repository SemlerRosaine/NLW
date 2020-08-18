const Database = require('./db')
const createProffy = require('./createProffy')
Database.then(async (db) => {
    //Inserir Dados

    proffyValue = {
        name: 'Rosaine',
        avatar: 'https://avatars0.githubusercontent.com/u/67932577?s=400&u=2df2a977a8ea87e8ec675a57d384ce4ca7f965e9&v=4',
        whatsapp: '123456',
        bio: 'Professora de Matemática'
    
    }

    classValue = {
        subject: 2,
        cost: "20",
        //o proffy id vira pelo banco
    }

    classScheduleValues = [
        //class_id vira pelo banco de dados apos cadastrada a aula
        {
        weekday: 0,
        time_from: 720,
        time_to: 1220
        },

        {
            weekday: 2,
            time_from: 520,
            time_to: 2220
            },

    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar dados inseridos - todos os proffys

    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar as classes de um determinado professor e trazer junto so dados do professor

    const selectedClassesAndProffys = await db.all(`
        SELECT classes.* , proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //console.log(selectedClassesAndProffys)

    //o horario qe a pessoa trabalha or exemplo é das 8h-18h
    //o horario time_from precisa ser menor ou igual ao horario solicitado
    //o time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    console.log(selectClassesSchedules)



})