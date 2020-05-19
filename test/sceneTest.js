/// <reference path="../js/Scene0.js"/>

describe('Dragonlearn app', () => {
    it('Check create objects', () => {
        var sc = new Scene0();
        expect(sc.checkCreateObject()).toBe(true);
    })
})