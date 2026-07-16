module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/marketing-frontend/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/marketing-frontend/app/favicon.ico.mjs { IMAGE => \"[project]/marketing-frontend/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/marketing-frontend/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/marketing-frontend/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Dashboard,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marketing-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/marketing-frontend/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marketing-frontend/node_modules/lucide-react/dist/esm/lucide-react.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/marketing-frontend/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-rsc] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/marketing-frontend/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-rsc] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/marketing-frontend/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-rsc] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/marketing-frontend/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-rsc] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/marketing-frontend/node_modules/lucide-react/dist/esm/icons/compass.mjs [app-rsc] (ecmascript) <export default as Compass>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const dynamic = "force-dynamic";
async function getDatabaseBlueprint() {
    const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$pg$29$__["Client"]({
        host: "localhost",
        port: 5432,
        database: "marketing_platform",
        user: "postgres",
        password: "founder_secret"
    });
    try {
        await client.connect();
        const res = await client.query("SELECT size_shape_specs FROM trend_blueprints WHERE platform_focus = 'LinkedIn' ORDER BY id DESC LIMIT 1");
        await client.end();
        if (res.rows.length > 0) return res.rows[0].size_shape_specs;
    } catch (e) {
        console.error(e);
    }
    return null;
}
async function Dashboard() {
    const dbData = await getDatabaseBlueprint();
    const blueprint = dbData || {
        platform_focus: "LinkedIn Document Carousel & Long-Form Text",
        market_void_opportunity: "Competitors are penalizing reach by dropping external links. The market void is natively hosted, high-contrast PDF slide decks.",
        specs: {
            primary_format: "PDF Document (1:1 Square aspect ratio)",
            slide_count: "5 pages (Hook ➔ Data Breakdown ➔ CTA)",
            text_formatting: "First line under 120 characters to maximize clicks."
        },
        content_strategy_suggestion: "Export a monochrome 5-slide PDF deck detailing your business analytics. Use elite typography."
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#09090b] text-zinc-100 font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-4 w-4 text-black stroke-[2.5]"
                                }, void 0, false, {
                                    fileName: "[project]/marketing-frontend/app/page.tsx",
                                    lineNumber: 1,
                                    columnNumber: 1680
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                lineNumber: 1,
                                columnNumber: 1554
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold tracking-widest text-sm uppercase",
                                children: [
                                    "AURA ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-500/90 font-light",
                                        children: "ANALYTICS"
                                    }, void 0, false, {
                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                        lineNumber: 1,
                                        columnNumber: 1813
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                lineNumber: 1,
                                columnNumber: 1742
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/marketing-frontend/app/page.tsx",
                        lineNumber: 1,
                        columnNumber: 1513
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-zinc-300 border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 rounded-full text-xs font-mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-1.5 w-1.5 rounded-full animate-pulse ${dbData ? "bg-emerald-400" : "bg-amber-500"}`
                            }, void 0, false, {
                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                lineNumber: 1,
                                columnNumber: 2025
                            }, this),
                            dbData ? "Live Database Engine Active" : "Sandbox Demo Mode"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/marketing-frontend/app/page.tsx",
                        lineNumber: 1,
                        columnNumber: 1889
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/marketing-frontend/app/page.tsx",
                lineNumber: 1,
                columnNumber: 1373
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-6xl mx-auto px-8 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-12 max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-amber-500/90 text-xs uppercase tracking-widest font-semibold mb-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                        lineNumber: 1,
                                        columnNumber: 2398
                                    }, this),
                                    " Predictive Strategy Intelligence"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                lineNumber: 1,
                                columnNumber: 2288
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-light tracking-tight text-zinc-100 sm:text-4xl",
                                children: "Your Predictive Market Strategy"
                            }, void 0, false, {
                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                lineNumber: 1,
                                columnNumber: 2466
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/marketing-frontend/app/page.tsx",
                        lineNumber: 1,
                        columnNumber: 2252
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-8 relative overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 right-0 p-6 opacity-10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Linkedin"], {
                                                    className: "h-24 w-24 text-zinc-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/marketing-frontend/app/page.tsx",
                                                    lineNumber: 1,
                                                    columnNumber: 2838
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 2783
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Linkedin"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/marketing-frontend/app/page.tsx",
                                                            lineNumber: 1,
                                                            columnNumber: 3027
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 2938
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xs uppercase tracking-widest text-zinc-500",
                                                                children: "Target Ecosystem"
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 3070
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-medium text-zinc-200",
                                                                children: blueprint.platform_focus
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 3155
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 3065
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 2892
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-zinc-800/60 pt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-xs uppercase tracking-widest text-amber-500/90 font-semibold mb-3 flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 3409
                                                            }, this),
                                                            " Strategic Market Void"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 3296
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-zinc-300 leading-relaxed text-sm font-light",
                                                        children: blueprint.market_void_opportunity
                                                    }, void 0, false, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 3466
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 3246
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                        lineNumber: 1,
                                        columnNumber: 2684
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-br from-zinc-900/60 to-zinc-950 border border-zinc-800/80 rounded-2xl p-8 shadow-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-xs uppercase tracking-widest text-zinc-400 mb-3",
                                                children: "AI Action Blueprint"
                                            }, void 0, false, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 3697
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-zinc-200 text-base leading-relaxed italic font-serif",
                                                children: [
                                                    '"',
                                                    blueprint.content_strategy_suggestion,
                                                    '"'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 3790
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "mt-6 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg",
                                                children: [
                                                    "Deploy Multi-Channel Post ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "h-3 w-3 stroke-[2.5]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 4117
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 3908
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                        lineNumber: 1,
                                        columnNumber: 3581
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                lineNumber: 1,
                                columnNumber: 2643
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-6 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                        className: "h-4 w-4 text-amber-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 4401
                                                    }, this),
                                                    " Algorithmic Specs"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 4294
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-xs text-zinc-500 uppercase mb-1",
                                                                children: "Dimensions & Layout"
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 4514
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-200 font-medium",
                                                                children: blueprint.specs.primary_format
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 4601
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 4509
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t border-zinc-800/60 pt-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-xs text-zinc-500 uppercase mb-1",
                                                                children: "Asset Depth"
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 4740
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-200 font-medium",
                                                                children: blueprint.specs.slide_count
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 4819
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 4690
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t border-zinc-800/60 pt-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-xs text-zinc-500 uppercase mb-1",
                                                                children: "Friction Optimization"
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 4955
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-300 font-light block",
                                                                children: blueprint.specs.text_formatting
                                                            }, void 0, false, {
                                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                                lineNumber: 1,
                                                                columnNumber: 5044
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                                        lineNumber: 1,
                                                        columnNumber: 4905
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                                lineNumber: 1,
                                                columnNumber: 4474
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                        lineNumber: 1,
                                        columnNumber: 4289
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marketing$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8 pt-4 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-500 text-center",
                                        children: "SECURE ACCESS ENGINE"
                                    }, void 0, false, {
                                        fileName: "[project]/marketing-frontend/app/page.tsx",
                                        lineNumber: 1,
                                        columnNumber: 5151
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/marketing-frontend/app/page.tsx",
                                lineNumber: 1,
                                columnNumber: 4185
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/marketing-frontend/app/page.tsx",
                        lineNumber: 1,
                        columnNumber: 2588
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/marketing-frontend/app/page.tsx",
                lineNumber: 1,
                columnNumber: 2205
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/marketing-frontend/app/page.tsx",
        lineNumber: 1,
        columnNumber: 1306
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/marketing-frontend/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/marketing-frontend/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__13qjn2f._.js.map