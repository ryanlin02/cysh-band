export class GalleryRuntime {
  constructor(baseUrl) {
    this.baseUrl = String(baseUrl || ".").replace(/\/$/, "");
    this.bootstrapPromise = null;
    this.corePromise = null;
    this.popularPromise = null;
    this.workerPromise = null;
    this.detailPromises = new Map();
  }

  resolve(relativePath) {
    return new URL(relativePath, `${this.baseUrl}/`).href;
  }

  async fetchJson(relativePath) {
    const response = await fetch(this.resolve(relativePath));
    if (!response.ok) {
      throw new Error(`資料載入失敗 ${response.status}: ${relativePath}`);
    }
    return response.json();
  }

  loadBootstrap() {
    if (!this.bootstrapPromise) {
      this.bootstrapPromise = this.fetchJson("bootstrap.json");
    }
    return this.bootstrapPromise;
  }

  async loadCore() {
    if (!this.corePromise) {
      this.corePromise = this.loadBootstrap().then((bootstrap) =>
        this.fetchJson(bootstrap.files.galleryCore.path)
      );
    }
    return this.corePromise;
  }

  async loadPopular() {
    if (!this.popularPromise) {
      this.popularPromise = this.loadBootstrap().then((bootstrap) =>
        this.fetchJson(bootstrap.files.popular.path)
      );
    }
    return this.popularPromise;
  }

  async startSearchWorker() {
    if (!this.workerPromise) {
      this.workerPromise = this.loadBootstrap().then((bootstrap) => {
        const workerUrl = this.resolve(bootstrap.files.searchWorker.path);
        const docsUrl = this.resolve(bootstrap.files.searchDocs.path);
        const suggestionsUrl = this.resolve(bootstrap.files.suggestions.path);
        const rulesUrl = this.resolve(bootstrap.files.searchRules.path);
        const synonymsUrl = this.resolve(bootstrap.files.synonyms.path);
        const worker = new Worker(workerUrl, { type: "module" });
        return new Promise((resolve, reject) => {
          const onMessage = (event) => {
            if (event.data?.type === "ready") {
              worker.removeEventListener("message", onMessage);
              resolve(worker);
            } else if (event.data?.type === "error") {
              worker.removeEventListener("message", onMessage);
              reject(new Error(event.data.message));
            }
          };
          worker.addEventListener("message", onMessage);
          worker.addEventListener("error", reject, { once: true });
          worker.postMessage({
            type: "init",
            docsUrl,
            suggestionsUrl,
            rulesUrl,
            synonymsUrl,
          });
        });
      });
    }
    return this.workerPromise;
  }

  async loadDetails(contentId) {
    const bootstrap = await this.loadBootstrap();
    const bucket = String(contentId || "").slice(0, 1).toLowerCase();
    const descriptor = bootstrap.files.details[bucket];
    if (!descriptor) throw new Error(`無效的content ID: ${contentId}`);
    if (!this.detailPromises.has(bucket)) {
      this.detailPromises.set(bucket, this.fetchJson(descriptor.path));
    }
    const shard = await this.detailPromises.get(bucket);
    return shard.content[contentId] || null;
  }
}
