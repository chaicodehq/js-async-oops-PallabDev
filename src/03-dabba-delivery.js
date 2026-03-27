/**
 * 🍱 Mumbai ka Dabbawala Service - ES6 Classes
 *
 * Mumbai ke famous dabbawala system ko ab modern ES6 class mein likho!
 * Har din hazaaron dabbas deliver hote hain aur ek bhi galat nahi jaata.
 * Tumhe DabbaService class banana hai jo customers manage kare, delivery
 * batches banaye, aur daily reports generate kare.
 *
 * Class: DabbaService
 *
 *   constructor(serviceName, area)
 *     - this.serviceName = serviceName
 *     - this.area = area
 *     - this.customers = [] (internal array)
 *     - this._nextId = 1 (auto-increment counter)
 *
 *   addCustomer(name, address, mealPreference)
 *     - mealPreference must be one of: "veg", "nonveg", "jain"
 *     - Agar invalid preference, return null
 *     - Agar name already exists (duplicate), return null
 *     - Creates customer: { id: auto-increment, name, address, mealPreference,
 *       active: true, delivered: false }
 *     - Pushes to this.customers
 *     - Returns the customer object
 *
 *   removeCustomer(name)
 *     - Sets customer's active to false (soft delete)
 *     - Returns true if found and deactivated
 *     - Returns false if not found or already inactive
 *
 *   createDeliveryBatch()
 *     - Returns array of delivery objects for all ACTIVE customers
 *     - Each delivery: { customerId: id, name, address, mealPreference,
 *       batchTime: new Date().toISOString() }
 *     - Resets delivered to false for all active customers before creating batch
 *     - Returns empty array if no active customers
 *
 *   markDelivered(customerId)
 *     - Finds active customer by id, sets delivered to true
 *     - Returns true if found and marked
 *     - Returns false if not found or not active
 *
 *   getDailyReport()
 *     - Returns report object for ACTIVE customers only:
 *       {
 *         totalCustomers: number (active only),
 *         delivered: number (active and delivered === true),
 *         pending: number (active and delivered === false),
 *         mealBreakdown: { veg: count, nonveg: count, jain: count }
 *       }
 *     - mealBreakdown counts active customers only
 *
 *   getCustomer(name)
 *     - Returns customer object by name (including inactive)
 *     - Returns null if not found
 *
 * Rules:
 *   - Use ES6 class syntax (not constructor functions)
 *   - Customer ids auto-increment starting from 1
 *   - No duplicate customer names allowed
 *   - removeCustomer is a soft delete (active: false), not actual removal
 *   - getDailyReport only counts active customers
 *   - mealPreference must be exactly "veg", "nonveg", or "jain"
 *
 * @example
 *   const service = new DabbaService("Raju Dabba", "Dadar");
 *   service.addCustomer("Amit", "Andheri West", "veg");
 *   // => { id: 1, name: "Amit", address: "Andheri West", mealPreference: "veg", active: true, delivered: false }
 *   service.addCustomer("Priya", "Bandra East", "jain");
 *   // => { id: 2, ... }
 *   service.createDeliveryBatch();
 *   // => [{ customerId: 1, name: "Amit", ... }, { customerId: 2, name: "Priya", ... }]
 *   service.markDelivered(1);       // => true
 *   service.getDailyReport();
 *   // => { totalCustomers: 2, delivered: 1, pending: 1, mealBreakdown: { veg: 1, nonveg: 0, jain: 1 } }
 */
export class DabbaService {
  constructor(serviceName, area) {
    // Your code here
    this.serviceName = serviceName;
    this.area = area;
    this.customers = [];
    this._nextId = 1;
  }

  addCustomer(name, address, mealPreference) {
    // Your code here
    let pref = ["veg", "nonveg", "jain"];
    if (
      !mealPreference ||
      typeof mealPreference !== "string" ||
      !pref.includes(mealPreference)
    )
      return null;
    if (!address || typeof address !== "string") return null;
    if (
      !name ||
      typeof name !== "string" ||
      this.customers.filter((customer) => customer.name === name).length > 0
    )
      return null;
    const customerObj = {
      id: this._nextId++,
      name,
      address,
      mealPreference,
      active: true,
      delivered: false,
    };
    this.customers.push(customerObj);
    return customerObj;
  }

  removeCustomer(name) {
    // Your code here
    if (!name || typeof name !== "string") return false;
    let filteredCustomer = this.customers.filter(
      (customer) => customer.name === name,
    );
    if (filteredCustomer.length < 1) return false;
    if (!filteredCustomer[0].active) return false;
    filteredCustomer[0].active = false;
    return true;
  }

  createDeliveryBatch() {
    // Your code here
    let filteredActiveCustomer = this.customers.filter(
      (customer) => customer.active,
    );
    if (filteredActiveCustomer.length < 1) return [];
    let deliveryBatch = filteredActiveCustomer.map((customer) => {
      return {
        customerId: customer.id,
        name: customer.name,
        address: customer.address,
        mealPreference: customer.mealPreference,
        batchTime: new Date().toISOString(),
      };
    });
    return deliveryBatch;
  }

  markDelivered(customerId) {
    // Your code here
    if (!customerId || isNaN(customerId) || !Number.isInteger(customerId))
      return false;
    let filteredCustomer = this.customers.filter(
      (customer) => customer.id === customerId,
    );
    if (filteredCustomer.length < 1) return false;
    if (filteredCustomer[0].delivered) return false;
    filteredCustomer[0].delivered = true;
    return true;
  }

  getDailyReport() {
    // Your code here
    let totalCustomers = this.customers.filter((customer) => customer.active);
    let delivered = this.customers.filter(
      (customer) => customer.active && customer.delivered,
    ).length;
    let pending = this.customers.filter(
      (customer) => customer.active && !customer.delivered,
    ).length;
    let mealBreakdown = totalCustomers.reduce(
      (result, customer) => {
        result[customer.mealPreference] += 1;
        return result;
      },
      {
        veg: 0,
        nonveg: 0,
        jain: 0,
      },
    );
    return {
      totalCustomers: totalCustomers.length,
      delivered,
      pending,
      mealBreakdown,
    };
  }

  getCustomer(name) {
    // Your code here
    if (
      !name ||
      typeof name !== "string" ||
      this.customers.filter((customer) => customer.name === name).length < 1
    )
      return null;
    return this.customers.filter((customer) => customer.name === name)[0];
  }
}
