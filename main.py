import tornado.ioloop
import tornado.web
import json
import random


class basicRequestHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world!!!!!!")


class resourceRequestHandler(tornado.web.RequestHandler):
    def get(self, id):
        self.write("Querying soemthing with id " + id)


class queryStringRequestHandler(tornado.web.RequestHandler):
    def get(self):
        n = int(self.get_argument("n"))
        r = "odd" if n % 2 else "even"

        self.write("the number " + str(n) + " is " + r)


class staticRequestHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class appjs(tornado.web.RequestHandler):
    def get(self):
        self.render("app.js")


class callJSON(tornado.web.RequestHandler):
    def get(self):
        response = {
            "agent": "Killjoy",
            "role": "Sentinel",
            "origin": "Germany",
            "abilities": {
                "basic": ["Alarmbot", "Nanoswarm"],
                "signature": "Turret",
                "ultimate": "Lockdown"
            }
        }

        self.write(response)


class start(tornado.web.RequestHandler):
    def get(self):
        self.render("start.html")


class startjs(tornado.web.RequestHandler):
    def get(self):
        self.render("generateField.js")


class generateNewGameId(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Content-Type", 'application/json')

    def post(self):
        value = self.request.body
        data = json.loads(value)
        generateSize(data['Difficult'])
        #send = {'gameId': gameId, 'field': field}
        send = {'gameId': gameId}
        self.write(send)
        # open['count'] = 2
        # open[1] = [5, 6, 1]
        # open[2] = [5, 7, 2]
        # print(data)


gameId = 0
field = []
xSize = 0
ySize = 0


def generateSize(mode):
    global gameId
    gameId += 1
    if mode == 'Easy':  # 9 * 9 - 10    8.1 (Клеток на 1 мину)
        x = 9
        y = 9
        mines = 10
    if mode == 'Medium':  # 16 * 16 - 40  6.4
        x = 16
        y = 16
        mines = 40
    if mode == 'Hard':  # 16 * 30 - 99  4.84
        x = 16
        y = 30
        mines = 99
    print(gameId, x, y, mines)
    generateField(x, y, mines)
    global xSize
    xSize = x
    global ySize
    ySize = y


def generateField(x, y, mines):
    mainField = []
    for i in range(0, x + 2):
        temp = []
        for j in range(0, y + 2):
            temp.append(0)
        mainField.append(temp)
    generateMines(x, y, mines, mainField)


def generateRandomXY(x, y):
    pos = list()
    pos.append(random.randint(1, x))
    pos.append(random.randint(1, y))
    return pos


def generateMines(x, y, mines, mainField):
    minesCord = set()
    while len(minesCord) < mines:
        pos = generateRandomXY(x, y)
        minesCord.add(tuple(pos))
    for cord in minesCord:
        mainField[cord[0]][cord[1]] = 1
    global field
    field = mainField
    for i in range(1, x + 1):
        for j in range(1, y + 1):
            print(field[i][j], end='')
        print('')


if __name__ == "__main__":
    app = tornado.web.Application([
        (r"/", staticRequestHandler),
        (r"/app.js", appjs),
        (r"/start", start),
        (r"/generateField.js", startjs),
        (r"/generateGameId", generateNewGameId),
        # (r"/", basicRequestHandler),
        # (r"/html", staticRequestHandler),
        # (r"/isEven", queryStringRequestHandler),
        # (r"/resource/([0-9]+)", resourceRequestHandler),
        (r"/api", callJSON),
    ])

    app.listen(8888)
    print("localhost:8888/")
    tornado.ioloop.IOLoop.current().start()
