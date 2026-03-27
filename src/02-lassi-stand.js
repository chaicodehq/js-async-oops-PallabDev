/**
 * 🥛 Punjab ki Famous Lassi Stand Chain - Constructor Functions & Prototype
 *
 * Punjab ki mashoor lassi stand chain hai jahan har stand pe fresh lassi milti
 * hai. Tumhe constructor function se lassi stands banana hai aur prototype pe
 * methods add karne hain. `new` keyword se har stand ek naya instance banega
 * aur prototype methods sab instances share karenge.
 *
 * Constructor: LassiStand(name, city)
 *   Called with `new` keyword. Sets up:
 *   - this.name = name
 *   - this.city = city
 *   - this.menu = [] (empty array, flavors will be added)
 *   - this.orderss = [] (empty array)
 *   - this._nextOrderId = 1 (internal counter for auto-increment)
 *
 * Prototype Methods (add on LassiStand.prototype):
 *
 *   addFlavor(flavor, price)
 *     - Pushes { flavor, price } to this.menu
 *     - No duplicates allowed: agar flavor already exists (same name), return -1
 *     - Price must be > 0, otherwise return -1
 *     - Returns menu length after adding
 *
 *   takeOrder(customerName, flavor, quantity)
 *     - Validates ki flavor this.menu mein exists hai
 *     - Quantity must be > 0
 *     - Creates order object:
 *       { id: auto-increment (starting 1), customer: customerName,
 *         flavor, quantity, total: price * quantity, status: "pending" }
 *     - Pushes to this.orderss
 *     - Returns order id
 *     - Agar flavor invalid ya quantity <= 0: return -1
 *
 *   completeOrder(orderId)
 *     - Finds order by id, sets status to "completed"
 *     - Returns true if found and updated
 *     - Returns false if not found or already completed
 *
 *   getRevenue()
 *     - Returns sum of totals for orders with status "completed" only
 *     - Pending orders count nahi honge
 *
 *   getMenu()
 *     - Returns a COPY of the menu array (not the original reference)
 *     - Modifying returned array should not affect internal menu
 *
 * Function: isLassiStand(obj)
 *   - Returns true if obj is an instance of LassiStand (use instanceof)
 *   - Returns false otherwise
 *
 * Rules:
 *   - LassiStand must be a constructor function (not a class)
 *   - Methods must be on prototype, NOT inside constructor
 *   - No duplicate flavors in menu (check by flavor name string)
 *   - Order ids auto-increment starting from 1
 *   - getMenu returns a copy, not the original array
 *
 * @param {string} name - Lassi stand ka naam
 * @param {string} city - City jahan stand hai
 *
 * @example
 *   const stand = new LassiStand("Sardar ji", "Amritsar");
 *   stand.addFlavor("mango", 40);          // => 1
 *   stand.addFlavor("rose", 35);           // => 2
 *   stand.addFlavor("mango", 45);          // => -1 (duplicate)
 *   stand.takeOrder("Rahul", "mango", 2);  // => 1
 *   stand.takeOrder("Priya", "rose", 1);   // => 2
 *   stand.completeOrder(1);                 // => true
 *   stand.getRevenue();                     // => 80
 *   isLassiStand(stand);                    // => truethis.orders
 *   isLassiStand({});                       // => false
 */
export function LassiStand(name, city) {
  // Your code here
  this.name = name;
  this.city = city;
  this.menu = [];
  this.orders = [];
  this._nextOrderId = 1;
}
LassiStand.prototype.addFlavor = function (flavor, price) {
  if (!flavor && typeof flavor !== "string") return -1;
  if ((!price && isNaN(price)) || price < 1) return -1;
  if (this.menu.filter((item) => item.flavor === flavor).length > 0) return -1;
  this.menu.push({ flavor, price });
  return this.menu.length;
};
LassiStand.prototype.takeOrder = function (customerName, flavor, quantity) {
  if (!flavor || typeof flavor !== "string") return -1;
  if (!quantity || isNaN(quantity) || !Number.isInteger(quantity)) return -1;
  let flavorFilter = this.menu.filter((item) => item.flavor === flavor);
  if (flavorFilter.length < 1) return -1;
  let id = this._nextOrderId++;
  this.orders.push({
    id,
    customer: customerName,
    flavor,
    quantity,
    total: flavorFilter[0].price * quantity,
    status: "pending",
  });
  return id;
};
LassiStand.prototype.completeOrder = function (orderId) {
  if (!orderId || isNaN(orderId) || !Number.isInteger(orderId)) return false;
  let filterOrder = this.orders.filter((order) => order.id === orderId);
  if (filterOrder.length < 1) return false;
  if (filterOrder[0].status === "completed") return false;
  filterOrder[0].status = "completed";
  return true;
};
LassiStand.prototype.getRevenue = function () {
  let filterCompletedOrder = this.orders.filter(
    (order) => order.status === "completed",
  );
  return filterCompletedOrder.reduce((sum, item) => sum + item.total, 0);
};

LassiStand.prototype.getMenu = function () {
  return structuredClone(this.menu);
};

export function isLassiStand(obj) {
  // Your code here
  return obj instanceof LassiStand;
}
