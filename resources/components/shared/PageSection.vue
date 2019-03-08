<template>
  <section class="page-section">
    <div class="page-section__head">
      <div class="container">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="page-section__content">
      <div class="container">
        <slot name="content"></slot>
      </div>
    </div>
  </section>
</template>
