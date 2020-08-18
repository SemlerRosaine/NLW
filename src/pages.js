const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')
//const { response } = require('express')

function pageLanding(requerid, response){
    return response.render("index.html")
}

async function pageStudy(requerid, responde){
    //manter os dados do usuario das opções de dia e horario
    const filter = requerid.query

    if(!filter.subject || !filter.weekdays || !filter.time){
        return response.render("study.html", {filter, subjects, weekdays})

    }

    //converter horas em minutos
    const timetoMinutes = convertHoursToMinutes(filter.time) 

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filter.weekdays}
            AND class_schedule.time_from <= ${timetoMinutes}
            AND class_schedule.time_to > ${timetoMinutes}
        )
        AND classes.subject = '${filter.subject}'
    
    `

    //caso haja erro na hora da consulta do banco de dados

    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return response.render('study.html', {proffys, subjects, filter, weekdays})


    } catch (error) {
        console.log(error)
    }



    
}

function pageGiveClasses(requerid, response){
    
    return response.render("give-classes.html", {subjects, weekdays})
}

function saveClass(requerid, response){
    const createProffy = require('./database/createProffy')
    
    
    const proffyValue = {
        name: require.body.name,
        avatar: require.body.avatar,
        whatsapp: require.body.whatsapp,
        bio: require.body.bio
    }

    const classValue = {
        subject: require.body.subject,
        cost: require.body.cost
    }

    const classScheduleValues = require.body.weekdays.map((weekday, index) => {



        return {
            weekday,
            time_from: convertHoursToMinutes(require.body.time_from[index]),
            time_to: convertHoursToMinutes(require.body.time_to[index])
        }
    })




}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClass
}

